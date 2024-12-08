import { defaultLayout, LayoutSchema, type Layout } from "./layout";
import {
  defaultElectricity,
  ElectricitySchema,
  type Electricity,
} from "./electricity";
import { defaultGas, GasSchema, type Gas } from "./gas";
import { z } from "zod";

export type House = {
  layout: Layout;
  electricity: Electricity;
  gas: Gas;
};

export const HouseSchema = z.object({
  layout: LayoutSchema,
  electricity: ElectricitySchema,
  gas: GasSchema,
});

export function parseHouseSchema(house: unknown) {
  return HouseSchema.parse(house);
}

export const defaultHouse: House = {
  layout: defaultLayout,
  electricity: defaultElectricity,
  gas: defaultGas,
};
