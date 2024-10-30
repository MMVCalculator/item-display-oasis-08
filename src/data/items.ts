import { Item } from "../types/Item";
import { materials } from "./categories/materials";
import { crops } from "./categories/crops";
import { food } from "./categories/food";

export const items: Item[] = [
  ...materials,
  ...crops,
  ...food
];