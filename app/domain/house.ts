export const defaults = {
  door: {
    width: 100,
    height: 200,
  },
  window: {
    width: 100,
    height: 200,
  },
  wall: {
    thickness: 9,
  },
  outlet: {
    amount: 1,
  },
};

export enum Orientation {
  HORIZONTAL = "horizontal",
  VERTICAL = "vertical",
}

export type PositionXY = {
  x: number;
  y: number;
};

export type PositionXZ = {
  x: number;
  z: number;
};

// A length is a number with a unit
// currently unused
export type Length = {
  value: number;
  unit: "m" | "cm" | "mm";
};

export type House = {
  floors: Floor[];
};

export type Floor = {
  name: string;
  walls: Wall[];
};

export type Wall = {
  start: PositionXY;
  end: PositionXY;
  thickness: number;
  doors: Door[];
  windows: Window[];
  outlets: Panel[];
};

export type Door = {
  position: number; // how far along the wall it is
  width?: number;
  height?: number;
};

export type Window = {
  position: PositionXZ;
  width?: number;
  height?: number;
};

export type Circuit = {
  name: string;
  ID: string;
};

export type Panel = {
  position: PositionXY;
  orientation: Orientation;
  items: PanelItem[];
};

export type PanelItem = {
  ID: string;
};

export type Outlet = {
  circuitID: string;
} & PanelItem;

export enum LightSwitchType {
  SINGLE = "single",
  DOUBLE = "double",
}

export type LightSwitch = {
  circuitIDs: string[];
} & PanelItem;
