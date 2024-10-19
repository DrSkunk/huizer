import { z } from "zod";

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

export enum Side {
  LEFT = "left",
  RIGHT = "right",
}

export enum PanelItemType {
  OUTLET = "outlet",
  LIGHT_SWITCH = "light-switch",
}

export const PositionXYSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const PositionXZSchema = z.object({
  x: z.number(),
  z: z.number(),
});

export const LengthSchema = z.object({
  value: z.number(),
  unit: z.enum(["m", "cm", "mm"]),
});

export const DoorSchema = z.object({
  position: z.number(),
  width: z.number().optional(),
  height: z.number().optional(),
});

export const WindowSchema = z.object({
  position: PositionXZSchema,
  width: z.number().optional(),
  height: z.number().optional(),
});

export const CircuitSchema = z.object({
  name: z.string(),
  ID: z.string(),
});

const BasePanelItemSchema = z.object({
  ID: z.string(),
});

const OutletSchema = BasePanelItemSchema.extend({
  type: z
    .nativeEnum(PanelItemType)
    .refine((val) => val === PanelItemType.OUTLET),
  amount: z.number(),
});

const LightSwitchSchema = BasePanelItemSchema.extend({
  type: z
    .nativeEnum(PanelItemType)
    .refine((val) => val === PanelItemType.LIGHT_SWITCH),
  circuitIDs: z.array(z.string()),
});

export const PanelItemSchema = z.union([OutletSchema, LightSwitchSchema]);

export const PanelSchema = z.object({
  position: PositionXYSchema,
  orientation: z.nativeEnum(Orientation),
  side: z.nativeEnum(Side),
  items: z.array(PanelItemSchema),
});

export const WallSchema = z.object({
  start: PositionXYSchema,
  end: PositionXYSchema,
  thickness: z.number(),
  doors: z.array(DoorSchema),
  windows: z.array(WindowSchema),
  panels: z.array(PanelSchema),
});

export const FloorSchema = z.object({
  name: z.string(),
  walls: z.array(WallSchema),
});

export const HouseSchema = z.object({
  floors: z.array(FloorSchema),
});

export type PositionXY = z.infer<typeof PositionXYSchema>;
export type PositionXZ = z.infer<typeof PositionXZSchema>;
export type Length = z.infer<typeof LengthSchema>;
export type Door = z.infer<typeof DoorSchema>;
export type Window = z.infer<typeof WindowSchema>;
export type Circuit = z.infer<typeof CircuitSchema>;
export type PanelItem = z.infer<typeof PanelItemSchema>;
export type Panel = z.infer<typeof PanelSchema>;
export type Wall = z.infer<typeof WallSchema>;
export type Floor = z.infer<typeof FloorSchema>;
export type House = z.infer<typeof HouseSchema>;

export const defaultHouse: House = {
  floors: [
    {
      name: "Ground floor",
      walls: [
        {
          start: { x: 0, y: 0 },
          end: { x: 1000, y: 0 },
          thickness: 30,
          doors: [
            {
              position: 100,
              width: 100,
            },
          ],
          windows: [
            {
              position: { x: 220, z: 0 },
              height: 220,
              width: 120,
            },
            {
              position: { x: 527, z: 0 },
              height: 220,
              width: 270,
            },
          ],
          panels: [
            {
              position: { x: 400, y: 0 },
              orientation: Orientation.VERTICAL,
              side: Side.RIGHT,
              items: [
                {
                  ID: "1",
                  type: PanelItemType.OUTLET,
                  amount: 5,
                },
                {
                  ID: "2",
                  type: PanelItemType.OUTLET,
                  amount: 2,
                },
              ],
            },
          ],
        },
        {
          start: { x: 1000, y: 0 },
          end: { x: 1000, y: 1000 },
          thickness: 30,
          doors: [],
          windows: [],
          panels: [],
        },
        {
          start: { x: 1000, y: 1000 },
          end: { x: 0, y: 1000 },
          thickness: 30,
          doors: [],
          windows: [],
          panels: [],
        },
        {
          start: { x: 0, y: 1000 },
          end: { x: 0, y: 0 },
          thickness: 30,
          doors: [],
          windows: [],
          panels: [],
        },
        {
          start: { x: 500, y: 0 },
          end: { x: 600, y: 1000 },
          thickness: 9,
          doors: [
            {
              position: 100,
            },
          ],
          windows: [
            {
              position: { x: 220, z: 0 },
              height: 220,
              width: 120,
            },
            {
              position: { x: 527, z: 0 },
              height: 220,
              width: 270,
            },
          ],
          panels: [
            {
              position: { x: 500, y: 0 },
              orientation: Orientation.VERTICAL,
              side: Side.LEFT,
              items: [
                {
                  ID: "1",
                  type: PanelItemType.OUTLET,
                  amount: 5,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
