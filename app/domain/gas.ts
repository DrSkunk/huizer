import { z } from "zod";

export enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
  FRONT = "front",
  BEHIND = "behind",
}

export type Edge = {
  from: number;
  to: number;
  distance: number;
  direction: Direction;
};

export enum NodeType {
  METER = "meter",
  MEASURE = "measure",
  JUNCTION = "junction",
  WALL = "wall",
  VALVE = "valve",
  BOILER = "boiler",
}

export type Node = {
  type: NodeType;
  label: string;
};

export type Gas = {
  nodes: Node[];
  edges: Edge[];
};

export const GasSchema = z.object({
  nodes: z.array(
    z.object({
      type: z.nativeEnum(NodeType),
      label: z.string(),
    })
  ),
  edges: z.array(
    z.object({
      from: z.number(),
      to: z.number(),
      distance: z.number().positive(),
      direction: z.nativeEnum(Direction),
    })
  ),
});

export const defaultGas: Gas = {
  nodes: [
    { type: NodeType.METER, label: "" },
    { type: NodeType.MEASURE, label: "A" },
    { type: NodeType.BOILER, label: "" },
  ],
  edges: [
    { from: 0, to: 1, distance: 0, direction: Direction.RIGHT },
    { from: 1, to: 2, distance: 100, direction: Direction.RIGHT },
  ],
};
