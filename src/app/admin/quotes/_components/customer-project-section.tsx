"use client";

import { useState, useTransition, useMemo, useCallback } from "react";
import { Plus } from "lucide-react";
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
import { createProject } from "@/lib/admin/actions/project-actions";
import { PROJECT_TYPE_LABELS } from "@/lib/constants";
import type {
  CustomerOption,
  LeadOption,
  ProjectOption,
  QuoteBuilderAction,
} from "@/lib/admin/types/quote-types";

/** Default square footage by project type when lead doesn't have it */
const DEFAULT_SQFT: Record<string, number> = {
  pickleball_court: 1800,
  tennis_court: 7200,
  basketball_court: 4200,
};

interface CustomerProjectSectionProps {
  state: { customer_id: string; lead_id: string; project_id: string };
  customers: CustomerOption[];
  leads: LeadOption[];
  projects: ProjectOption[];
  dispatch: React.Dispatch<QuoteBuilderAction>;
  onProjectCreated: (project: ProjectOption) => void;
}

export function CustomerProjectSection({
  state,
  customers,
  leads,
  projects,
  dispatch,
  onProjectCreated,
}: CustomerProjectSectionProps) {
  const [showNewProject, setShowNewProject] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // New project form state
  const [projectName, setProjectName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [numberOfCourts, setNumberOfCourts] = useState("");
  const [city, setCity] = useState("");

  /** Pre-fill project form from lead intake data */
  const prefillFromLead = useCallback((lead: LeadOption) => {
    if (lead.project_type) setProjectType(lead.project_type);
    if (lead.number_of_courts) setNumberOfCourts(String(lead.number_of_courts));
    if (lead.city) setCity(lead.city);

    // Use lead's sq ft if available, otherwise default by project type
    if (lead.square_feet) {
      setSquareFeet(String(lead.square_feet));
    } else if (lead.project_type && DEFAULT_SQFT[lead.project_type]) {
      setSquareFeet(String(DEFAULT_SQFT[lead.project_type]));
    }

    // Auto-generate project name from lead name
    setProjectName(`${lead.display_name} Court`);
  }, []);

  // Track active tab in local state (initialized from reducer state)
  const [activeTab, setActiveTab] = useState(state.lead_id ? "lead" : "customer");

  const filteredProjects = useMemo(
    () =>
      state.customer_id
        ? projects.filter((p) => p.customer_id === state.customer_id)
        : [],
    [state.customer_id, projects]
  );

  function handleTabChange(tab: string) {
    setActiveTab(tab);
    if (tab === "lead") {
      dispatch({ type: "SET_LEAD", lead_id: "" });
    } else {
      dispatch({ type: "SET_CUSTOMER", customer_id: "" });
    }
    setShowNewProject(false);
    setError(null);
  }

  function handleCreateProject() {
    const ownerId = state.customer_id || state.lead_id;
    if (!ownerId || !projectName.trim()) return;
    setError(null);

    startTransition(async () => {
      const result = await createProject({
        customer_id: state.customer_id || undefined,
        lead_id: state.lead_id || undefined,
        name: projectName.trim(),
        project_type: projectType || undefined,
        square_feet: squareFeet ? parseFloat(squareFeet) : null,
        number_of_courts: numberOfCourts ? parseInt(numberOfCourts) : null,
        city: city || undefined,
      });

      if (result.success && result.project_id) {
        // Pull condition assessment from the selected lead (if any)
        const selectedLead = state.lead_id
          ? leads.find((l) => l.id === state.lead_id)
          : null;
        const newProject: ProjectOption = {
          id: result.project_id,
          name: projectName.trim(),
          customer_id: state.customer_id,
          square_feet: squareFeet ? parseFloat(squareFeet) : null,
          number_of_courts: numberOfCourts ? parseInt(numberOfCourts) : null,
          crack_length_ft: selectedLead?.crack_length_ft ?? null,
          bird_bath_count: selectedLead?.bird_bath_count ?? null,
        };
        onProjectCreated(newProject);
        dispatch({ type: "SET_PROJECT", project_id: result.project_id });
        setShowNewProject(false);
        setProjectName("");
        setProjectType("");
        setSquareFeet("");
        setNumberOfCourts("");
        setCity("");
      } else {
        setError(result.error ?? "Failed to create project");
      }
    });
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Customer & Project</h3>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="customer">Existing Customer</TabsTrigger>
          <TabsTrigger value="lead">Lead</TabsTrigger>
        </TabsList>

        <TabsContent value="customer" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Customer select */}
            <div className="space-y-1.5">
              <Label>Customer</Label>
              <Select
                value={state.customer_id}
                onValueChange={(v) =>
                  dispatch({ type: "SET_CUSTOMER", customer_id: v })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select customer..." />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.display_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Project select */}
            <div className="space-y-1.5">
              <Label>Project</Label>
              {!showNewProject ? (
                <div className="flex gap-2">
                  <Select
                    value={state.project_id}
                    onValueChange={(v) =>
                      dispatch({ type: "SET_PROJECT", project_id: v })
                    }
                    disabled={!state.customer_id}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select project..." />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredProjects.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setShowNewProject(true)}
                    disabled={!state.customer_id}
                    title="Create new project"
                  >
                    <Plus className="size-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewProject(false)}
                >
                  Use Existing Project
                </Button>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="lead" className="mt-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Lead select */}
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
                <SelectTrigger className="w-full">
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

            {/* Project — create new for lead */}
            <div className="space-y-1.5">
              <Label>Project</Label>
              {!showNewProject ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewProject(true)}
                  disabled={!state.lead_id}
                >
                  <Plus className="size-4 mr-1" />
                  Create Project
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowNewProject(false)}
                >
                  Cancel
                </Button>
              )}
              {state.project_id && !showNewProject && (
                <p className="text-sm text-muted-foreground mt-1">
                  Project created
                </p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Inline new project form */}
      {showNewProject && (state.customer_id || state.lead_id) && (
        <div className="rounded-md border p-4 space-y-4 bg-muted/30">
          <h4 className="font-medium text-sm">New Project</h4>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Project Name</Label>
              <Input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Smith Residence Court"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label>Project Type</Label>
              <Select
                value={projectType}
                onValueChange={(v) => {
                  setProjectType(v);
                  // Default sq ft when user hasn't entered a value
                  if (!squareFeet && DEFAULT_SQFT[v]) {
                    setSquareFeet(String(DEFAULT_SQFT[v]));
                  }
                }}
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
              <Label>Square Feet</Label>
              <Input
                type="number"
                value={squareFeet}
                onChange={(e) => setSquareFeet(e.target.value)}
                placeholder="e.g. 7200"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Number of Courts</Label>
              <Input
                type="number"
                value={numberOfCourts}
                onChange={(e) => setNumberOfCourts(e.target.value)}
                placeholder="e.g. 2"
              />
            </div>
            <div className="space-y-1.5">
              <Label>City</Label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Dallas"
              />
            </div>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button
            type="button"
            size="sm"
            onClick={handleCreateProject}
            disabled={isPending || !projectName.trim()}
          >
            {isPending ? "Creating..." : "Create Project"}
          </Button>
        </div>
      )}
    </div>
  );
}
