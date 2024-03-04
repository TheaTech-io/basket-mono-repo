type cartType = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

type GetCartType = {
  product: cartType;
  quantity: number;
};

type couponsType = {
  id: number;
  coupon: string;
  discountType: string;
  discountValue: number | string;
};
