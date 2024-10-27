export type Electricity = {
  configuration: {
    rows: number;
    modulesPerRow: number;
  };
  rows: ElectricalComponent[][];
};

export type Phase = "L1" | "L2" | "L3" | "N";
export type ComponentType = "fuse" | "differential";

export interface ElectricalComponent {
  type: ComponentType;
  phase: Phase[];
  rating: number;
  width: number;
  group?: string;
  description?: string;
}

export interface Fuse extends ElectricalComponent {
  type: "fuse";
  group: string;
}

export interface Differential extends ElectricalComponent {
  type: "differential";
}
