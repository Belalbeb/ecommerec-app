export interface CartItem {
  productId: {
    _id: string;
    title: string;
    price: number;
    image: string;
      description: string;  
    category: string;
  };
  quantity: number;
}
