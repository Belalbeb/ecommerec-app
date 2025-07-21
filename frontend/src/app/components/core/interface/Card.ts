import { CartItem } from "./Cartitem";

export interface Cart {
  _id: string;
  userId: string;
  products: CartItem[];
}
