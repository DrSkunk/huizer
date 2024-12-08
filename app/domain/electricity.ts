import { z } from "zod";

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

const ElectricalComponentSchema = z.object({
  type: z.union([z.literal("fuse"), z.literal("differential")]),
  phase: z.array(
    z.union([z.literal("L1"), z.literal("L2"), z.literal("L3"), z.literal("N")])
  ),
  rating: z.number().positive(),
  width: z.number().positive(),
  group: z.string().optional(),
  description: z.string().optional(),
});

export const ElectricitySchema = z
  .object({
    configuration: z.object({
      rows: z.number().positive(),
      modulesPerRow: z.number().positive(),
    }),
    rows: z.array(z.array(ElectricalComponentSchema)),
  })
  .refine((data) => data.rows.length === data.configuration.rows, {
    message: "The number of rows must match the configuration.",
    path: ["rows"], // Points to the `rows` field in the error message
  })
  .refine(
    (data) =>
      data.rows.every((row) => row.length <= data.configuration.modulesPerRow),
    {
      message: "Each row can have at most `modulesPerRow` modules.",
      path: ["rows"], // Points to the `rows` field in the error message
    }
  );

export const defaultElectricity: Electricity = {
  configuration: {
    rows: 3,
    modulesPerRow: 18,
  },
  rows: [
    [
      {
        type: "differential",
        phase: ["L3", "N"],
        rating: 30, // mA
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L3", "N"],
        rating: 16,
        group: "A",
        description: "Lichten 1",
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L3", "N"],
        rating: 16,
        group: "B",
        description: "Lichten 2",
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L3", "N"],
        rating: 20,
        group: "C",
        description: "Stroom 1",
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L3", "N"],
        rating: 20,
        group: "C",
        description: "Stroom 2",
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L3", "N"],
        rating: 20,
        group: "C",
        description: "Stroom 3",
        width: 2,
      },
    ],
    [
      {
        type: "differential",
        phase: ["L2", "N"],
        rating: 30, // mA
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L2", "N"],
        rating: 20, //A
        group: "F",
        description: "Droogkast M",
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L2", "N"],
        rating: 20,
        group: "G",
        description: "Oude zekering C",
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L2", "N"],
        rating: 20,
        group: "H",
        description: "Oude zekering E",
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L2", "N"],
        rating: 20,
        group: "I",
        description: "Oude zekering K",
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L1", "N"],
        rating: 16,
        group: "J",
        description: "Stopcontact kelder",
        width: 2,
      },
    ],
    [
      {
        type: "fuse",
        phase: ["L1", "N"],
        rating: 20,
        group: "P",
        description: "Koelkast, microgolf",
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L2", "N"],
        rating: 20,
        group: "Q",
        description: "Oven",
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L3", "N"],
        rating: 20,
        group: "R",
        description: "CV",
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L1", "N"],
        rating: 20,
        group: "S",
        description: "Airco",
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L1", "N"],
        rating: 20,
        group: "T",
        description: "Boiler",
        width: 2,
      },
      {
        type: "fuse",
        phase: ["L1", "L2", "L3", "N"],
        rating: 20,
        group: "U",
        description: "Kookvuur",
        width: 4,
      },
      {
        type: "differential",
        phase: ["L1", "L2", "L3", "N"],
        rating: 300,
        width: 4,
      },
    ],
  ],
};
