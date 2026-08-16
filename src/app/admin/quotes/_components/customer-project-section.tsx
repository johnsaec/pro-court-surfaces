"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PROJECT_TYPE_LABELS, SPORT_TYPE_LABELS } from "@/lib/constants";
import type {
  CustomerOption,
  LeadOption,
  QuoteBuilderState,
  QuoteBuilderAction,
} from "@/lib/admin/types/quote-types";

/** Default square footage per single court, by sport (editable by admin) */
const SPORT_SQFT: Record<string, number> = {
  pickleball: 1800,
  tennis: 7200,
  basketball: 4200,
  volleyball: 4000,
  multi_sport: 7200,
};

/** Default sq ft for a sport × number of courts (min 1) */
function defaultSqftFor(sport: string, courts: string): number | null {
  const base = SPORT_SQFT[sport];
  if (!base) return null;
  const n = parseInt(courts) || 1;
  return base * n;
}

interface CustomerProjectSectionProps {
  state: QuoteBuilderState;
  customers: CustomerOption[];
  leads: LeadOption[];
  dispatch: React.Dispatch<QuoteBuilderAction>;
}

export function CustomerProjectSection({
  state,
  customers,
  leads,
  dispatch,
}: CustomerProjectSectionProps) {
  const [activeTab, setActiveTab] = useState(state.lead_id ? "lead" : "customer");

  /** Pre-fill project fields from lead intake data */
  const prefillFromLead = useCallback(
    (lead: LeadOption) => {
      if (lead.project_type) {
        dispatch({ type: "SET_PROJECT_FIELD", field: "project_type", value: lead.project_type });
      }
      if (lead.number_of_courts) {
        dispatch({ type: "SET_PROJECT_FIELD", field: "number_of_courts", value: String(lead.number_of_courts) });
      }
      if (lead.city) {
        dispatch({ type: "SET_PROJECT_FIELD", field: "city", value: lead.city });
      }
      if (lead.address_line1) {
        dispatch({ type: "SET_PROJECT_FIELD", field: "address_line1", value: lead.address_line1 });
      }
      if (lead.state) {
        dispatch({ type: "SET_PROJECT_FIELD", field: "state", value: lead.state });
      }
      if (lead.crack_length_ft) {
        dispatch({ type: "SET_PROJECT_FIELD", field: "crack_length_ft", value: String(lead.crack_length_ft) });
      }
      if (lead.bird_bath_count) {
        dispatch({ type: "SET_PROJECT_FIELD", field: "bird_bath_count", value: String(lead.bird_bath_count) });
      }

      const sports = lead.sports ?? [];
      if (sports.length) {
        dispatch({ type: "SET_SPORTS", sports });
      }

      // Use lead's sq ft if available, otherwise default from the primary sport
      if (lead.square_feet) {
        dispatch({ type: "SET_PROJECT_FIELD", field: "square_feet", value: String(lead.square_feet) });
      } else if (sports[0]) {
        const sqft = defaultSqftFor(sports[0], String(lead.number_of_courts ?? ""));
        if (sqft) {
          dispatch({ type: "SET_PROJECT_FIELD", field: "square_feet", value: String(sqft) });
        }
      }
    },
    [dispatch]
  );

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    if (tab === "lead") {
      dispatch({ type: "SET_LEAD", lead_id: "" });
    } else {
      dispatch({ type: "SET_CUSTOMER", customer_id: "" });
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Customer & Project Details</h3>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="customer">Existing Customer</TabsTrigger>
          <TabsTrigger value="lead">Lead</TabsTrigger>
        </TabsList>

        <TabsContent value="customer" className="mt-4">
          <div className="space-y-1.5">
            <Label>Customer</Label>
            <Select
              value={state.customer_id}
              onValueChange={(v) =>
                dispatch({ type: "SET_CUSTOMER", customer_id: v })
              }
            >
              <SelectTrigger className="w-full sm:w-72">
                <SelectValue placeholder="Select customer..." />
              </SelectTrigger>
              <SelectContent>
                {customers.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.company_name
                      ? `${c.display_name} — ${c.company_name}`
                      : c.display_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="lead" className="mt-4">
          <div className="space-y-1.5">
            <Label>Lead</Label>
            <Select
              value={state.lead_id}
              onValueChange={(v) => {
                dispatch({ type: "SET_LEAD", lead_id: v });
                const lead = leads.find((l) => l.id === v);
                if (lead) prefillFromLead(lead);
              }}
            >
              <SelectTrigger className="w-full sm:w-72">
                <SelectValue placeholder="Select lead..." />
              </SelectTrigger>
              <SelectContent>
                {leads.map((l) => (
                  <SelectItem key={l.id} value={l.id}>
                    {l.display_name}
                    {l.email && (
                      <span className="text-muted-foreground ml-1">
                        ({l.email})
                      </span>
                    )}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>

      {/* Project details — shown when customer or lead is selected */}
      {(state.customer_id || state.lead_id) && (
        <div className="rounded-md border p-4 space-y-4 bg-muted/30">
          <h4 className="font-medium text-sm">Project Details</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="space-y-1.5">
              <Label>Project Type</Label>
              <Select
                value={state.project_type}
                onValueChange={(v) =>
                  dispatch({ type: "SET_PROJECT_FIELD", field: "project_type", value: v })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select type..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(PROJECT_TYPE_LABELS).map(([val, label]) => (
                    <SelectItem key={val} value={val}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Sport</Label>
              <Select
                value={state.sports[0] ?? ""}
                onValueChange={(v) => {
                  dispatch({ type: "SET_SPORTS", sports: [v] });
                  // Default sq ft from the sport when empty
                  if (!state.square_feet) {
                    const sqft = defaultSqftFor(v, state.number_of_courts);
                    if (sqft) {
                      dispatch({ type: "SET_PROJECT_FIELD", field: "square_feet", value: String(sqft) });
                    }
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select sport..." />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SPORT_TYPE_LABELS).map(([val, label]) => (
                    <SelectItem key={val} value={val}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Square Feet</Label>
              <Input
                type="number"
                value={state.square_feet}
                onChange={(e) =>
                  dispatch({ type: "SET_PROJECT_FIELD", field: "square_feet", value: e.target.value })
                }
                placeholder="e.g. 7200"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Number of Courts</Label>
              <Input
                type="number"
                value={state.number_of_courts}
                onChange={(e) =>
                  dispatch({ type: "SET_PROJECT_FIELD", field: "number_of_courts", value: e.target.value })
                }
                placeholder="e.g. 2"
              />
            </div>
            <div className="space-y-1.5">
              <Label>City</Label>
              <Input
                value={state.city}
                onChange={(e) =>
                  dispatch({ type: "SET_PROJECT_FIELD", field: "city", value: e.target.value })
                }
                placeholder="e.g. Austin"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Address</Label>
              <Input
                value={state.address_line1}
                onChange={(e) =>
                  dispatch({ type: "SET_PROJECT_FIELD", field: "address_line1", value: e.target.value })
                }
                placeholder="e.g. 123 Main St"
              />
            </div>
            <div className="space-y-1.5">
              <Label>State</Label>
              <Input
                value={state.state}
                onChange={(e) =>
                  dispatch({ type: "SET_PROJECT_FIELD", field: "state", value: e.target.value })
                }
                placeholder="TX"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
