"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  LINE_ITEM_TYPE_LABELS,
  UNIT_OF_MEASURE_LABELS,
} from "@/lib/constants";
import type { LineItemState, QuoteBuilderAction } from "@/lib/admin/types/quote-types";

interface LineItemRowProps {
  item: LineItemState;
  packageKey: string;
  dispatch: React.Dispatch<QuoteBuilderAction>;
}

export function LineItemRow({ item, packageKey, dispatch }: LineItemRowProps) {
  function update(field: string, value: string | number | boolean) {
    dispatch({
      type: "UPDATE_LINE_ITEM",
      packageKey,
      itemKey: item._key,
      field,
      value,
    });
  }

  return (
    <TableRow>
      <TableCell>
        <Input
          value={item.name}
          onChange={(e) => update("name", e.target.value)}
          className="h-8 text-sm"
          placeholder="Item name"
        />
      </TableCell>
      <TableCell>
        <Select
          value={item.line_item_type}
          onValueChange={(v) => update("line_item_type", v)}
        >
          <SelectTrigger className="h-8 text-sm w-[130px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(LINE_ITEM_TYPE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Select
          value={item.unit_of_measure}
          onValueChange={(v) => update("unit_of_measure", v)}
        >
          <SelectTrigger className="h-8 text-sm w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(UNIT_OF_MEASURE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => update("quantity", parseFloat(e.target.value) || 0)}
          className="h-8 text-sm w-20"
          min={0}
          step="any"
        />
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={item.unit_price}
          onChange={(e) => update("unit_price", parseFloat(e.target.value) || 0)}
          className="h-8 text-sm w-24"
          min={0}
          step="0.01"
        />
      </TableCell>
      <TableCell className="text-right font-medium tabular-nums">
        ${item.total_price.toFixed(2)}
      </TableCell>
      <TableCell>
        <Switch
          checked={item.is_optional}
          onCheckedChange={(v) => update("is_optional", v)}
        />
      </TableCell>
      <TableCell>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={() =>
            dispatch({
              type: "REMOVE_LINE_ITEM",
              packageKey,
              itemKey: item._key,
            })
          }
        >
          <Trash2 className="size-3.5 text-destructive" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
