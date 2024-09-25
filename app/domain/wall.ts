/*
Walls are part of a floor.
A Floor has
- walls
- doors
- windows

A straight wall has
- start position (x, y)
- end position (x, y)
- thickness
Units are mm.

A Window has
- position (x, y)
- width
- height
Units are mm.
*/
type Floor = {
  walls: Wall[];
  doors: Door[];
  windows: Window[];
};

type Wall = {
  start: { x: number; y: number };
  end: { x: number; y: number };
  thickness: number;
};

type Window = {
  position: { x: number; y: number };
  width: number;
  height: number;
};

type Door = {
  position: { x: number; y: number };
  width: number;
};

type Room = {
  floor: Floor;
};
