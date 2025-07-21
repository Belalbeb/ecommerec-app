export interface Product {
  _id:number;
  title: string;
  price: number;
  description: string;
  image: string;
  category:string|null;
  rating: {
    rate: number;
    count: number;
  };
}
