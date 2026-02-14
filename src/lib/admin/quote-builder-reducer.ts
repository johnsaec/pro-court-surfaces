import type {
  QuoteBuilderState,
  QuoteBuilderAction,
  PackageState,
  LineItemState,
  QuoteDetail,
} from "@/lib/admin/types/quote-types";
import type { Service } from "@/lib/admin/queries/catalog-queries";
import { PACKAGE_TIER_LABELS } from "@/lib/constants";

let keyCounter = 0;
function nextKey() {
  return `_k${++keyCounter}`;
}

// ── Factory functions ───────────────────────────────────────────────

export function createEmptyState(): QuoteBuilderState {
  return {
    customer_id: "",
    lead_id: "",
    project_id: "",
    packages: [],
    color_inside_id: "",
    color_outside_id: "",
    color_lines_id: "",
    cover_note: "",
    terms_and_conditions: "",
    internal_notes: "",
    discount_amount: 0,
    deposit_due_days: 7,
  };
}

export function stateFromQuote(quote: QuoteDetail): QuoteBuilderState {
  return {
    customer_id: quote.customer_id ?? "",
    lead_id: quote.lead_id ?? "",
    project_id: quote.project_id,
    packages: quote.quote_packages.map((pkg) => ({
      _key: nextKey(),
      tier: pkg.tier,
      name: pkg.name,
      description: pkg.description ?? "",
      is_recommended: pkg.is_recommended,
      sort_order: pkg.sort_order,
      line_items: pkg.quote_line_items.map((li) => ({
        _key: nextKey(),
        service_id: li.service_id,
        name: li.name,
        description: li.description ?? "",
        line_item_type: li.line_item_type,
        unit_of_measure: li.unit_of_measure ?? "",
        quantity: li.quantity,
        unit_price: li.unit_price,
        total_price: li.total_price,
        is_optional: li.is_optional,
        is_included_by_default: li.is_included_by_default,
        sort_order: li.sort_order,
      })),
    })),
    color_inside_id: quote.color_inside_id ?? "",
    color_outside_id: quote.color_outside_id ?? "",
    color_lines_id: quote.color_lines_id ?? "",
    cover_note: quote.cover_note ?? "",
    terms_and_conditions: quote.terms_and_conditions ?? "",
    internal_notes: quote.internal_notes ?? "",
    discount_amount: quote.discount_amount ?? 0,
    deposit_due_days: quote.deposit_due_days ?? 7,
  };
}

export function lineItemFromService(
  service: Service,
  defaultQuantity: number
): LineItemState {
  const qty = defaultQuantity || 1;
  return {
    _key: nextKey(),
    service_id: service.id,
    name: service.name,
    description: service.description ?? "",
    line_item_type: service.line_item_type,
    unit_of_measure: service.unit_of_measure,
    quantity: qty,
    unit_price: service.base_price,
    total_price: qty * service.base_price,
    is_optional: service.is_add_on,
    is_included_by_default: !service.is_add_on,
    sort_order: 0,
  };
}

export function createEmptyLineItem(): LineItemState {
  return {
    _key: nextKey(),
    service_id: null,
    name: "",
    description: "",
    line_item_type: "base_service",
    unit_of_measure: "flat_rate",
    quantity: 1,
    unit_price: 0,
    total_price: 0,
    is_optional: false,
    is_included_by_default: true,
    sort_order: 0,
  };
}

export function computePackageSubtotal(items: LineItemState[]): number {
  return items.reduce((sum, li) => sum + li.total_price, 0);
}

export function getRecommendedPackageSubtotal(
  state: QuoteBuilderState
): number {
  const recommended = state.packages.find((p) => p.is_recommended);
  if (!recommended) {
    // Fall back to first package
    return state.packages.length > 0
      ? computePackageSubtotal(state.packages[0].line_items)
      : 0;
  }
  return computePackageSubtotal(recommended.line_items);
}

// ── Reducer ─────────────────────────────────────────────────────────

export function quoteBuilderReducer(
  state: QuoteBuilderState,
  action: QuoteBuilderAction
): QuoteBuilderState {
  switch (action.type) {
    case "SET_CUSTOMER":
      return { ...state, customer_id: action.customer_id, lead_id: "", project_id: "" };

    case "SET_LEAD":
      return { ...state, lead_id: action.lead_id, customer_id: "", project_id: "" };

    case "SET_PROJECT":
      return { ...state, project_id: action.project_id };

    case "ADD_PACKAGE": {
      const tierLabel =
        PACKAGE_TIER_LABELS[action.tier] ?? action.tier;
      const newPkg: PackageState = {
        _key: nextKey(),
        tier: action.tier,
        name: `${tierLabel} Package`,
        description: "",
        is_recommended: state.packages.length === 0, // first package is recommended by default
        sort_order: state.packages.length,
        line_items: [],
      };
      return { ...state, packages: [...state.packages, newPkg] };
    }

    case "REMOVE_PACKAGE":
      return {
        ...state,
        packages: state.packages.filter((p) => p._key !== action.packageKey),
      };

    case "UPDATE_PACKAGE":
      return {
        ...state,
        packages: state.packages.map((p) =>
          p._key === action.packageKey
            ? { ...p, [action.field]: action.value }
            : p
        ),
      };

    case "SET_RECOMMENDED":
      return {
        ...state,
        packages: state.packages.map((p) => ({
          ...p,
          is_recommended: p._key === action.packageKey,
        })),
      };

    case "ADD_LINE_ITEM":
      return {
        ...state,
        packages: state.packages.map((p) =>
          p._key === action.packageKey
            ? {
                ...p,
                line_items: [
                  ...p.line_items,
                  { ...action.item, sort_order: p.line_items.length },
                ],
              }
            : p
        ),
      };

    case "UPDATE_LINE_ITEM":
      return {
        ...state,
        packages: state.packages.map((p) => {
          if (p._key !== action.packageKey) return p;
          return {
            ...p,
            line_items: p.line_items.map((li) => {
              if (li._key !== action.itemKey) return li;
              const updated = { ...li, [action.field]: action.value };
              // Recalculate total when quantity or unit_price changes
              if (action.field === "quantity" || action.field === "unit_price") {
                updated.total_price = updated.quantity * updated.unit_price;
              }
              return updated;
            }),
          };
        }),
      };

    case "REMOVE_LINE_ITEM":
      return {
        ...state,
        packages: state.packages.map((p) =>
          p._key === action.packageKey
            ? {
                ...p,
                line_items: p.line_items.filter(
                  (li) => li._key !== action.itemKey
                ),
              }
            : p
        ),
      };

    case "SET_COLOR":
      return { ...state, [action.field]: action.value };

    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "LOAD_STATE":
      return action.state;

    default:
      return state;
  }
}
