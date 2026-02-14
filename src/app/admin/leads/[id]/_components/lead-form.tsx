"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/admin/form-field";
import { MultiSelectInput } from "@/components/admin/multi-select-input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  updateLead,
  type LeadFormData,
} from "@/lib/admin/actions/lead-actions";
import {
  DEAL_STAGE_LABELS,
  LEAD_SOURCE_LABELS,
  PROJECT_TYPE_LABELS,
  SPORT_TYPE_LABELS,
} from "@/lib/constants";
import type { Lead } from "@/lib/admin/queries/lead-queries";

function SectionHeading({ title }: { title: string }) {
  return (
    <div>
      <Separator className="mb-6" />
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
    </div>
  );
}

export function LeadForm({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Select states
  const [dealStage, setDealStage] = useState(lead.deal_stage);
  const [leadSource, setLeadSource] = useState(lead.lead_source ?? "");
  const [projectType, setProjectType] = useState(lead.project_type ?? "");
  const [sports, setSports] = useState<string[]>(lead.sports ?? []);

  // Boolean states
  const [cracksPresent, setCracksPresent] = useState(lead.cracks_present);
  const [blisteringBoiling, setBlisteringBoiling] = useState(
    lead.blistering_boiling
  );
  const [paintChipping, setPaintChipping] = useState(lead.paint_chipping);
  const [broomFinish, setBroomFinish] = useState(lead.broom_finish);
  const [vaporBarrier, setVaporBarrier] = useState(lead.vapor_barrier);
  const [wantsBasketball, setWantsBasketball] = useState(
    lead.wants_basketball_lines
  );
  const [wantsVolleyball, setWantsVolleyball] = useState(
    lead.wants_volleyball_lines
  );
  const [wantsNet, setWantsNet] = useState(lead.wants_net);
  const [wantsFence, setWantsFence] = useState(lead.wants_fence);
  const [wantsLights, setWantsLights] = useState(lead.wants_lights);
  const [interestedFinancing, setInterestedFinancing] = useState(
    lead.interested_in_financing
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const fd = new FormData(e.currentTarget);

    const parseNum = (key: string) => {
      const v = fd.get(key) as string;
      return v ? parseFloat(v) : null;
    };

    const data: LeadFormData = {
      display_name: fd.get("display_name") as string,
      first_name: fd.get("first_name") as string,
      last_name: fd.get("last_name") as string,
      email: fd.get("email") as string,
      phone: fd.get("phone") as string,
      city: fd.get("city") as string,
      deal_stage: dealStage,
      lead_source: leadSource || undefined,
      lead_source_detail: fd.get("lead_source_detail") as string,
      project_type: projectType || undefined,
      sports,
      square_feet: parseNum("square_feet"),
      number_of_courts: parseNum("number_of_courts"),
      court_age_years: parseNum("court_age_years"),
      cracks_present: cracksPresent,
      crack_length_ft: parseNum("crack_length_ft"),
      bird_bath_count: parseNum("bird_bath_count"),
      bird_bath_area_sqft: parseNum("bird_bath_area_sqft"),
      blistering_boiling: blisteringBoiling,
      paint_chipping: paintChipping,
      broom_finish: broomFinish,
      vapor_barrier: vaporBarrier,
      concrete_pour_date: fd.get("concrete_pour_date") as string,
      color_inside: fd.get("color_inside") as string,
      color_outside: fd.get("color_outside") as string,
      color_lines: fd.get("color_lines") as string,
      wants_basketball_lines: wantsBasketball,
      wants_volleyball_lines: wantsVolleyball,
      wants_net: wantsNet,
      wants_fence: wantsFence,
      wants_lights: wantsLights,
      interested_in_financing: interestedFinancing,
      notes: fd.get("notes") as string,
    };

    startTransition(async () => {
      const result = await updateLead(lead.id, data);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error ?? "Something went wrong");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {/* Section 1: Identity */}
      <h3 className="text-lg font-semibold">Contact Information</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          label="Display Name"
          name="display_name"
          required
          defaultValue={lead.display_name}
        />
        <FormField
          label="Email"
          name="email"
          type="email"
          defaultValue={lead.email ?? ""}
        />
        <FormField
          label="First Name"
          name="first_name"
          defaultValue={lead.first_name ?? ""}
        />
        <FormField
          label="Last Name"
          name="last_name"
          defaultValue={lead.last_name ?? ""}
        />
        <FormField
          label="Phone"
          name="phone"
          type="tel"
          defaultValue={lead.phone ?? ""}
        />
        <FormField
          label="City"
          name="city"
          defaultValue={lead.city ?? ""}
        />
      </div>

      {/* Section 2: Deal Tracking */}
      <SectionHeading title="Deal Tracking" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Deal Stage" name="deal_stage">
          <Select value={dealStage} onValueChange={setDealStage}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(DEAL_STAGE_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Lead Source" name="lead_source">
          <Select value={leadSource} onValueChange={setLeadSource}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select source..." />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LEAD_SOURCE_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField
          label="Source Detail"
          name="lead_source_detail"
          defaultValue={lead.lead_source_detail ?? ""}
          className="sm:col-span-2"
        />
      </div>

      {/* Section 3: Court Details */}
      <SectionHeading title="Court Details" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField label="Project Type" name="project_type">
          <Select value={projectType} onValueChange={setProjectType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type..." />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(PROJECT_TYPE_LABELS).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField
          label="Square Feet"
          name="square_feet"
          type="number"
          defaultValue={lead.square_feet ?? ""}
        />
        <FormField
          label="Number of Courts"
          name="number_of_courts"
          type="number"
          defaultValue={lead.number_of_courts ?? ""}
        />
        <FormField
          label="Court Age (years)"
          name="court_age_years"
          type="number"
          step="0.5"
          defaultValue={lead.court_age_years ?? ""}
        />
      </div>
      <MultiSelectInput
        label="Sports"
        name="sports"
        value={sports}
        onChange={setSports}
        options={Object.keys(SPORT_TYPE_LABELS)}
        mode="checkbox"
      />

      {/* Section 4: Condition Assessment */}
      <SectionHeading title="Condition Assessment" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <Switch
            id="cracks_present"
            checked={cracksPresent}
            onCheckedChange={setCracksPresent}
          />
          <Label htmlFor="cracks_present">Cracks Present</Label>
        </div>
        {cracksPresent && (
          <FormField
            label="Crack Length (ft)"
            name="crack_length_ft"
            type="number"
            step="0.5"
            defaultValue={lead.crack_length_ft ?? ""}
          />
        )}
        <FormField
          label="Bird Bath Count"
          name="bird_bath_count"
          type="number"
          defaultValue={lead.bird_bath_count ?? ""}
        />
        <FormField
          label="Bird Bath Area (sq ft)"
          name="bird_bath_area_sqft"
          type="number"
          step="0.5"
          defaultValue={lead.bird_bath_area_sqft ?? ""}
        />
        <div className="flex items-center gap-2">
          <Switch
            id="blistering_boiling"
            checked={blisteringBoiling}
            onCheckedChange={setBlisteringBoiling}
          />
          <Label htmlFor="blistering_boiling">Blistering / Boiling</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="paint_chipping"
            checked={paintChipping}
            onCheckedChange={setPaintChipping}
          />
          <Label htmlFor="paint_chipping">Paint Chipping</Label>
        </div>
      </div>

      {/* Section 5: Concrete Details */}
      <SectionHeading title="Concrete Details" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <Switch
            id="broom_finish"
            checked={broomFinish}
            onCheckedChange={setBroomFinish}
          />
          <Label htmlFor="broom_finish">Broom Finish</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="vapor_barrier"
            checked={vaporBarrier}
            onCheckedChange={setVaporBarrier}
          />
          <Label htmlFor="vapor_barrier">Vapor Barrier</Label>
        </div>
        <FormField
          label="Concrete Pour Date"
          name="concrete_pour_date"
          defaultValue={lead.concrete_pour_date ?? ""}
          placeholder="e.g. March 2020"
        />
      </div>

      {/* Section 6: Color Preferences */}
      <SectionHeading title="Color Preferences" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <FormField
          label="Inside Color"
          name="color_inside"
          defaultValue={lead.color_inside ?? ""}
          placeholder="e.g. US Open Blue"
        />
        <FormField
          label="Outside Color"
          name="color_outside"
          defaultValue={lead.color_outside ?? ""}
          placeholder="e.g. Championship Green"
        />
        <FormField
          label="Lines Color"
          name="color_lines"
          defaultValue={lead.color_lines ?? ""}
          placeholder="e.g. White"
        />
      </div>

      {/* Section 7: Add-On Interest */}
      <SectionHeading title="Add-On Interest" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-2">
          <Switch
            id="wants_basketball_lines"
            checked={wantsBasketball}
            onCheckedChange={setWantsBasketball}
          />
          <Label htmlFor="wants_basketball_lines">Basketball Lines</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="wants_volleyball_lines"
            checked={wantsVolleyball}
            onCheckedChange={setWantsVolleyball}
          />
          <Label htmlFor="wants_volleyball_lines">Volleyball Lines</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="wants_net"
            checked={wantsNet}
            onCheckedChange={setWantsNet}
          />
          <Label htmlFor="wants_net">Net</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="wants_fence"
            checked={wantsFence}
            onCheckedChange={setWantsFence}
          />
          <Label htmlFor="wants_fence">Fence</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="wants_lights"
            checked={wantsLights}
            onCheckedChange={setWantsLights}
          />
          <Label htmlFor="wants_lights">Lights</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="interested_in_financing"
            checked={interestedFinancing}
            onCheckedChange={setInterestedFinancing}
          />
          <Label htmlFor="interested_in_financing">Financing Interest</Label>
        </div>
      </div>

      {/* Section 8: Notes */}
      <SectionHeading title="Notes" />
      <div className="space-y-1.5">
        <Label htmlFor="notes">Internal Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          defaultValue={lead.notes ?? ""}
          rows={4}
        />
      </div>

      {/* Footer */}
      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && (
        <p className="text-sm text-green-600">Lead updated successfully.</p>
      )}
      <div className="flex gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/leads")}
        >
          Back to Leads
        </Button>
      </div>
    </form>
  );
}
