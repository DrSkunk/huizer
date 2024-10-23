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
