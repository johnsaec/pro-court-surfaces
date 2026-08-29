import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { QuoteDetail, QuotePackageRow, QuoteLineItemRow, ConditionSection } from "@/lib/admin/types/quote-types";
import { PROJECT_TYPE_LABELS } from "@/lib/constants";

const GREEN = "#1a5632";
const LIGHT_GRAY = "#f3f4f6";
const BORDER = "#d1d5db";
const TEXT = "#1f2937";
const MUTED = "#6b7280";

const s = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: TEXT,
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    borderBottom: `2px solid ${GREEN}`,
    paddingBottom: 12,
  },
  brandName: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
  },
  brandSubtitle: {
    fontSize: 9,
    color: MUTED,
    marginTop: 2,
  },
  headerRight: {
    alignItems: "flex-end",
  },
  quoteNumber: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
  },
  headerMeta: {
    fontSize: 8,
    color: MUTED,
    marginTop: 2,
  },
  // Sections
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
    marginBottom: 6,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    marginBottom: 2,
  },
  label: {
    width: 100,
    fontFamily: "Helvetica-Bold",
    fontSize: 9,
  },
  value: {
    flex: 1,
    fontSize: 9,
  },
  // Cover note
  coverNote: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 9,
    padding: 10,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 4,
    marginTop: 4,
  },
  // Table
  tableHeader: {
    flexDirection: "row",
    backgroundColor: GREEN,
    padding: 6,
    borderRadius: 2,
  },
  tableHeaderText: {
    color: "#ffffff",
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
  },
  tableRow: {
    flexDirection: "row",
    padding: 5,
    borderBottom: `0.5px solid ${BORDER}`,
  },
  tableRowAlt: {
    backgroundColor: LIGHT_GRAY,
  },
  colName: { flex: 3, paddingRight: 8 },
  itemName: { fontSize: 9 },
  itemDesc: { fontSize: 7, color: MUTED, lineHeight: 1.4, marginTop: 2 },
  colQty: { width: 40, textAlign: "right" },
  colUnit: { width: 65, textAlign: "right" },
  colTotal: { width: 65, textAlign: "right" },
  // Package
  packageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: LIGHT_GRAY,
    padding: 8,
    borderRadius: 4,
    marginTop: 12,
    marginBottom: 6,
  },
  packageTier: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
    textTransform: "uppercase",
  },
  packageName: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
  },
  packageSubtotal: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
  },
  packageDesc: {
    fontSize: 8,
    color: MUTED,
    marginBottom: 6,
  },
  // Colors
  colorRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  colorSwatch: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  swatch: {
    width: 24,
    height: 24,
    borderRadius: 4,
    border: `1px solid ${BORDER}`,
  },
  swatchLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
  },
  swatchName: {
    fontSize: 8,
    color: MUTED,
  },
  // Summary
  summaryBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 10,
  },
  summaryValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
  },
  summaryTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: `1px solid ${BORDER}`,
    paddingTop: 6,
    marginTop: 4,
  },
  summaryTotalLabel: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },
  summaryTotalValue: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
  },
  // Summary extras
  perSqft: {
    fontSize: 9,
    color: MUTED,
    textAlign: "right",
    marginTop: 2,
  },
  depositRow: {
    marginTop: 8,
    paddingTop: 6,
    borderTop: `1px solid ${BORDER}`,
  },
  depositText: {
    fontSize: 9,
    color: TEXT,
  },
  // Conditions / clauses
  clause: {
    marginBottom: 6,
  },
  clauseTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: TEXT,
    marginBottom: 2,
  },
  clauseBody: {
    fontSize: 8,
    color: MUTED,
    lineHeight: 1.5,
  },
  // Payment terms boxes
  paymentTermsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 4,
  },
  paymentTermBox: {
    flex: 1,
    padding: 10,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 4,
  },
  paymentTermPct: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: GREEN,
  },
  paymentTermLabel: {
    fontSize: 8,
    color: MUTED,
    marginTop: 2,
  },
  // Signature block
  signatureBlock: {
    marginTop: 18,
  },
  sigRow: {
    flexDirection: "row",
    gap: 24,
    marginTop: 10,
  },
  sigCol: {
    flex: 1,
  },
  sigLabel: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    marginBottom: 22,
  },
  sigLine: {
    borderTop: `1px solid ${TEXT}`,
  },
  sigCaption: {
    fontSize: 7,
    color: MUTED,
    marginTop: 3,
  },
  // Optional add-ons
  addonLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: MUTED,
    marginTop: 8,
    marginBottom: 2,
    textTransform: "uppercase",
  },
  // Terms
  terms: {
    fontSize: 8,
    color: MUTED,
    marginTop: 4,
    lineHeight: 1.5,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 24,
    left: 40,
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTop: `0.5px solid ${BORDER}`,
    paddingTop: 6,
    fontSize: 7,
    color: MUTED,
  },
});

function fmt(amount: number | null | undefined): string {
  if (amount == null) return "$0.00";
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function LineItemRow({ item, i }: { item: QuoteLineItemRow; i: number }) {
  return (
    <View style={[s.tableRow, i % 2 === 1 ? s.tableRowAlt : {}]}>
      <View style={s.colName}>
        <Text style={s.itemName}>{item.name}</Text>
        {item.description ? <Text style={s.itemDesc}>{item.description}</Text> : null}
      </View>
      <Text style={s.colQty}>{item.quantity}</Text>
      <Text style={s.colUnit}>
        {item.is_optional && item.total_price === 0 ? "" : fmt(item.unit_price)}
      </Text>
      <Text style={s.colTotal}>
        {item.is_optional && item.total_price === 0 ? "On request" : fmt(item.total_price)}
      </Text>
    </View>
  );
}

function PackageSection({ pkg, index }: { pkg: QuotePackageRow; index: number }) {
  const included = pkg.quote_line_items.filter((li) => !li.is_optional);
  const addons = pkg.quote_line_items.filter((li) => li.is_optional);
  return (
    <View wrap={false}>
      <View style={s.packageHeader}>
        <View>
          <Text style={s.packageName}>{pkg.name}</Text>
        </View>
        <Text style={s.packageSubtotal}>{fmt(pkg.subtotal)}</Text>
      </View>
      {pkg.description && <Text style={s.packageDesc}>{pkg.description}</Text>}
      {/* Line items table */}
      <View style={s.tableHeader}>
        <Text style={[s.tableHeaderText, s.colName]}>Item</Text>
        <Text style={[s.tableHeaderText, s.colQty]}>Qty</Text>
        <Text style={[s.tableHeaderText, s.colUnit]}>Unit Price</Text>
        <Text style={[s.tableHeaderText, s.colTotal]}>Total</Text>
      </View>
      {included.map((item, i) => (
        <LineItemRow key={item.id} item={item} i={i} />
      ))}
      {addons.length > 0 && (
        <View>
          <Text style={s.addonLabel}>Optional Add-Ons (not included in total)</Text>
          {addons.map((item, i) => (
            <LineItemRow key={item.id} item={item} i={i} />
          ))}
        </View>
      )}
    </View>
  );
}

function ConditionsSections({ conditions }: { conditions: ConditionSection[] | null }) {
  if (!conditions || conditions.length === 0) return null;
  const groups: { section: string; items: ConditionSection[] }[] = [];
  for (const c of conditions) {
    let g = groups.find((x) => x.section === c.section);
    if (!g) {
      g = { section: c.section, items: [] };
      groups.push(g);
    }
    g.items.push(c);
  }
  return (
    <>
      {groups.map((g) => (
        <View key={g.section} wrap={false}>
          <Text style={s.sectionTitle}>{g.section}</Text>
          {g.items.map((c, i) => (
            <View key={i} style={s.clause}>
              {c.title !== g.section && <Text style={s.clauseTitle}>{c.title}</Text>}
              {c.body.split("\n").map((line, j) => (
                <Text key={j} style={s.clauseBody}>
                  {line}
                </Text>
              ))}
            </View>
          ))}
        </View>
      ))}
    </>
  );
}

type QuotePdfDocumentProps = {
  quote: QuoteDetail;
  selectedPackageId?: string | null;
};

export function QuotePdfDocument({ quote, selectedPackageId }: QuotePdfDocumentProps) {
  const contact = quote.customer ?? quote.lead;
  const contactLabel = quote.customer ? "Customer" : "Lead";
  const isAccepted = ["accepted", "deposit_paid", "completed"].includes(quote.status);

  // Filter packages: only selected package for accepted quotes
  const packages = isAccepted && selectedPackageId
    ? quote.quote_packages.filter((p) => p.id === selectedPackageId)
    : quote.quote_packages;

  const projectType = quote.project_type
    ? (PROJECT_TYPE_LABELS[quote.project_type] ?? quote.project_type)
    : null;

  const fmtDate = (d: Date) =>
    d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const createdDate = fmtDate(new Date(quote.created_at));
  const validThrough = fmtDate(
    quote.expires_at
      ? new Date(quote.expires_at)
      : new Date(new Date(quote.created_at).getTime() + 30 * 86400000)
  );

  const total = quote.total ?? 0;
  const depositPct = Number(quote.deposit_percent ?? 30);
  const depositAmount = (total * depositPct) / 100;
  const balanceAmount = total - depositAmount;
  const perSqft = quote.square_feet && quote.square_feet > 0 ? total / quote.square_feet : null;
  const hasCustomSchedule =
    Array.isArray(quote.payment_schedule) && quote.payment_schedule.length > 1;

  return (
    <Document title={`Quote ${quote.quote_number}`} author="Pro Court Surfaces">
      <Page size="LETTER" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.brandName}>Pro Court Surfaces</Text>
            <Text style={s.brandSubtitle}>Austin, TX</Text>
          </View>
          <View style={s.headerRight}>
            <Text style={s.quoteNumber}>{quote.quote_number}</Text>
            <Text style={s.headerMeta}>{createdDate}</Text>
            <Text style={s.headerMeta}>Valid through {validThrough}</Text>
            <Text style={s.headerMeta}>Version {quote.version}</Text>
          </View>
        </View>

        {/* Prepared For */}
        {contact && (
          <>
            <Text style={s.sectionTitle}>Prepared For</Text>
            <View style={s.row}>
              <Text style={s.label}>{contactLabel}:</Text>
              <Text style={s.value}>{contact.display_name}</Text>
            </View>
            {contact.email && (
              <View style={s.row}>
                <Text style={s.label}>Email:</Text>
                <Text style={s.value}>{contact.email}</Text>
              </View>
            )}
            {contact.phone && (
              <View style={s.row}>
                <Text style={s.label}>Phone:</Text>
                <Text style={s.value}>{contact.phone}</Text>
              </View>
            )}
          </>
        )}

        {/* Project Details */}
        {(projectType || quote.city || quote.square_feet) && (
          <>
            <Text style={s.sectionTitle}>Project Details</Text>
            {quote.address_line1 && (
              <View style={s.row}>
                <Text style={s.label}>Address:</Text>
                <Text style={s.value}>
                  {[quote.address_line1, quote.city, quote.state, quote.zip]
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              </View>
            )}
            {projectType && (
              <View style={s.row}>
                <Text style={s.label}>Type:</Text>
                <Text style={s.value}>{projectType}</Text>
              </View>
            )}
            {quote.number_of_courts && (
              <View style={s.row}>
                <Text style={s.label}>Courts:</Text>
                <Text style={s.value}>{quote.number_of_courts}</Text>
              </View>
            )}
            {quote.square_feet && (
              <View style={s.row}>
                <Text style={s.label}>Square Feet:</Text>
                <Text style={s.value}>{quote.square_feet.toLocaleString()}</Text>
              </View>
            )}
          </>
        )}

        {/* Cover Note */}
        {quote.cover_note && (
          <>
            <Text style={s.sectionTitle}>Note</Text>
            <Text style={s.coverNote}>{quote.cover_note}</Text>
          </>
        )}

        {/* Packages */}
        <Text style={s.sectionTitle}>
          {packages.length === 1 ? "Selected Package" : "Package Options"}
        </Text>
        {packages.map((pkg, i) => (
          <PackageSection key={pkg.id} pkg={pkg} index={i} />
        ))}

        {/* Summary */}
        <View style={s.summaryBox} wrap={false}>
          <View style={s.summaryRow}>
            <Text style={s.summaryLabel}>Subtotal</Text>
            <Text style={s.summaryValue}>{fmt(quote.subtotal ?? total)}</Text>
          </View>
          {quote.discount_amount != null && quote.discount_amount > 0 && (
            <View style={s.summaryRow}>
              <Text style={s.summaryLabel}>Discount</Text>
              <Text style={s.summaryValue}>-{fmt(quote.discount_amount)}</Text>
            </View>
          )}
          <View style={s.summaryTotal}>
            <Text style={s.summaryTotalLabel}>
              Total{packages.length > 1 ? " (recommended)" : ""}
            </Text>
            <Text style={s.summaryTotalValue}>{fmt(total)}</Text>
          </View>
          {perSqft && <Text style={s.perSqft}>{fmt(perSqft)} per square foot</Text>}
          {!hasCustomSchedule && total > 0 && (
            <View style={s.depositRow}>
              <Text style={s.depositText}>
                Deposit ({depositPct}%): {fmt(depositAmount)} due at signing · Balance ({100 - depositPct}%): {fmt(balanceAmount)} at completion
              </Text>
            </View>
          )}
        </View>

        {/* Court Colors */}
        {(quote.color_inside || quote.color_outside || quote.color_nvz || quote.color_lines) && (
          <>
            <Text style={s.sectionTitle}>Court Colors</Text>
            <View style={s.colorRow}>
              {quote.color_outside && (
                <View style={s.colorSwatch}>
                  <View style={[s.swatch, { backgroundColor: quote.color_outside.hex_code }]} />
                  <View>
                    <Text style={s.swatchLabel}>Outside</Text>
                    <Text style={s.swatchName}>{quote.color_outside.name}</Text>
                  </View>
                </View>
              )}
              {quote.color_inside && (
                <View style={s.colorSwatch}>
                  <View style={[s.swatch, { backgroundColor: quote.color_inside.hex_code }]} />
                  <View>
                    <Text style={s.swatchLabel}>Inside</Text>
                    <Text style={s.swatchName}>{quote.color_inside.name}</Text>
                  </View>
                </View>
              )}
              {quote.color_nvz && (
                <View style={s.colorSwatch}>
                  <View style={[s.swatch, { backgroundColor: quote.color_nvz.hex_code }]} />
                  <View>
                    <Text style={s.swatchLabel}>NVZ</Text>
                    <Text style={s.swatchName}>{quote.color_nvz.name}</Text>
                  </View>
                </View>
              )}
              {quote.color_lines && (
                <View style={s.colorSwatch}>
                  <View style={[s.swatch, { backgroundColor: quote.color_lines.hex_code }]} />
                  <View>
                    <Text style={s.swatchLabel}>Lines</Text>
                    <Text style={s.swatchName}>{quote.color_lines.name}</Text>
                  </View>
                </View>
              )}
            </View>
          </>
        )}

        {/* Payment Terms */}
        {!hasCustomSchedule && total > 0 && (
          <>
            <Text style={s.sectionTitle}>Payment Terms</Text>
            <View style={s.paymentTermsRow}>
              <View style={s.paymentTermBox}>
                <Text style={s.paymentTermPct}>{depositPct}%</Text>
                <Text style={s.paymentTermLabel}>Deposit — due at contract execution</Text>
              </View>
              <View style={s.paymentTermBox}>
                <Text style={s.paymentTermPct}>{100 - depositPct}%</Text>
                <Text style={s.paymentTermLabel}>Balance — due at substantial completion</Text>
              </View>
            </View>
          </>
        )}

        {/* Structured conditions / exclusions / warranty */}
        <ConditionsSections conditions={quote.conditions} />

        {/* Freeform terms (if any) */}
        {quote.terms_and_conditions && (
          <>
            <Text style={s.sectionTitle}>Additional Terms</Text>
            <Text style={s.terms}>{quote.terms_and_conditions}</Text>
          </>
        )}

        {/* Signature block */}
        {quote.show_signature && (
          <View style={s.signatureBlock} wrap={false}>
            <Text style={s.sectionTitle}>Acceptance</Text>
            <View style={s.sigRow}>
              <View style={s.sigCol}>
                <Text style={s.sigLabel}>Accepted By</Text>
                <View style={s.sigLine} />
                <Text style={s.sigCaption}>Signature / Printed Name / Date</Text>
              </View>
              <View style={s.sigCol}>
                <Text style={s.sigLabel}>Pro Court Surfaces</Text>
                <View style={s.sigLine} />
                <Text style={s.sigCaption}>Patrick Johnson, Owner / Date</Text>
              </View>
            </View>
          </View>
        )}

        {/* Footer */}
        <View style={s.footer} fixed>
          <Text>Pro Court Surfaces — Austin, TX</Text>
          <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}
