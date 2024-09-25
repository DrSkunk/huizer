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
};

export type Position = {
  x: number;
  y: number;
};

// A length is a number with a unit
// currently unused
export type Length = {
  value: number;
  unit: "m" | "cm" | "mm";
};

export type Floor = {
  name: string;
  walls: Wall[];
};

export type Wall = {
  start: Position;
  end: Position;
  thickness: number;
  doors: Door[];
  windows: Window[];
};

export type Window = {
  position: Position;
  width?: number;
  height?: number;
};

export type Door = {
  position: number; // how far along the wall it is
  width?: number;
  height?: number;
};

export type House = {
  floors: Floor[];
};
