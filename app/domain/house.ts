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
  panels: Panel[];
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

export enum Side {
  LEFT = "left",
  RIGHT = "right",
}

export type Panel = {
  position: PositionXY;
  orientation: Orientation;
  side: Side;
  items: PanelItem[];
};

export enum PanelItemType {
  OUTLET = "outlet",
  LIGHT_SWITCH = "light-switch",
}

interface BasePanelItem {
  ID: string;
}

interface Outlet extends BasePanelItem {
  type: PanelItemType.OUTLET;
  amount: number;
}

interface LightSwitch extends BasePanelItem {
  type: PanelItemType.LIGHT_SWITCH;
  circuitIDs: string[];
}

export type PanelItem = Outlet | LightSwitch;
