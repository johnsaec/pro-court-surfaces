"use client";

import { useState, useTransition, useMemo } from "react";
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
import { createProject } from "@/lib/admin/actions/project-actions";
import { PROJECT_TYPE_LABELS } from "@/lib/constants";
import type {
  CustomerOption,
  ProjectOption,
  QuoteBuilderAction,
} from "@/lib/admin/types/quote-types";

interface CustomerProjectSectionProps {
  state: { customer_id: string; project_id: string };
  customers: CustomerOption[];
  projects: ProjectOption[];
  dispatch: React.Dispatch<QuoteBuilderAction>;
  onProjectCreated: (project: ProjectOption) => void;
}

export function CustomerProjectSection({
  state,
  customers,
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

  const filteredProjects = useMemo(
    () =>
      state.customer_id
        ? projects.filter((p) => p.customer_id === state.customer_id)
        : [],
    [state.customer_id, projects]
  );

  function handleCreateProject() {
    if (!state.customer_id || !projectName.trim()) return;
    setError(null);

    startTransition(async () => {
      const result = await createProject({
        customer_id: state.customer_id,
        name: projectName.trim(),
        project_type: projectType || undefined,
        square_feet: squareFeet ? parseFloat(squareFeet) : null,
        number_of_courts: numberOfCourts ? parseInt(numberOfCourts) : null,
        city: city || undefined,
      });

      if (result.success && result.project_id) {
        const newProject: ProjectOption = {
          id: result.project_id,
          name: projectName.trim(),
          customer_id: state.customer_id,
          square_feet: squareFeet ? parseFloat(squareFeet) : null,
          number_of_courts: numberOfCourts ? parseInt(numberOfCourts) : null,
          crack_length_ft: null,
          bird_bath_count: null,
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

      {/* Inline new project form */}
      {showNewProject && state.customer_id && (
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
              <Select value={projectType} onValueChange={setProjectType}>
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
