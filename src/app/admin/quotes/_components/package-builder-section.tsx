"use client";

import { Plus, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PackageEditor } from "./package-editor";
import { PACKAGE_TIER_LABELS } from "@/lib/constants";
import type { Service } from "@/lib/admin/queries/catalog-queries";
import type { QuoteBuilderState, ProjectData, QuoteBuilderAction } from "@/lib/admin/types/quote-types";
import { useState } from "react";

interface PackageBuilderSectionProps {
  state: QuoteBuilderState;
  services: Service[];
  projectData: ProjectData;
  dispatch: React.Dispatch<QuoteBuilderAction>;
}

export function PackageBuilderSection({
  state,
  services,
  projectData,
  dispatch,
}: PackageBuilderSectionProps) {
  const [addTier, setAddTier] = useState("");
  const usedTiers = new Set(state.packages.map((p) => p.tier));
  const availableTiers = Object.keys(PACKAGE_TIER_LABELS).filter(
    (t) => !usedTiers.has(t)
  );

  function handleAddPackage() {
    if (!addTier) return;
    dispatch({ type: "ADD_PACKAGE", tier: addTier });
    setAddTier("");
  }

  if (state.packages.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Packages</h3>
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground mb-4">
            Add at least one package tier to your quote.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Select value={addTier} onValueChange={setAddTier}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select tier..." />
              </SelectTrigger>
              <SelectContent>
                {availableTiers.map((tier) => (
                  <SelectItem key={tier} value={tier}>
                    {PACKAGE_TIER_LABELS[tier]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              onClick={handleAddPackage}
              disabled={!addTier}
            >
              <Plus className="size-4 mr-1" />
              Add Package
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Packages</h3>
        {availableTiers.length > 0 && (
          <div className="flex items-center gap-2">
            <Select value={addTier} onValueChange={setAddTier}>
              <SelectTrigger className="w-36 h-8">
                <SelectValue placeholder="Add tier..." />
              </SelectTrigger>
              <SelectContent>
                {availableTiers.map((tier) => (
                  <SelectItem key={tier} value={tier}>
                    {PACKAGE_TIER_LABELS[tier]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleAddPackage}
              disabled={!addTier}
            >
              <Plus className="size-4 mr-1" />
              Add
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue={state.packages[0]?._key}>
        <TabsList>
          {state.packages.map((pkg) => (
            <TabsTrigger key={pkg._key} value={pkg._key} className="gap-1.5">
              {PACKAGE_TIER_LABELS[pkg.tier] ?? pkg.tier}
              {pkg.is_recommended && (
                <Star className="size-3 fill-yellow-400 text-yellow-400" />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {state.packages.map((pkg) => (
          <TabsContent key={pkg._key} value={pkg._key} className="mt-4">
            <div className="flex items-center gap-2 mb-4">
              {!pkg.is_recommended && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    dispatch({ type: "SET_RECOMMENDED", packageKey: pkg._key })
                  }
                >
                  <Star className="size-3.5 mr-1" />
                  Set as Recommended
                </Button>
              )}
              {pkg.is_recommended && (
                <Badge className="bg-yellow-100 text-yellow-800">
                  <Star className="size-3 fill-yellow-600 text-yellow-600 mr-1" />
                  Recommended
                </Badge>
              )}
            </div>
            <PackageEditor
              pkg={pkg}
              services={services}
              projectData={projectData}
              dispatch={dispatch}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
