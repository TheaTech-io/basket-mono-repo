export type couponType = {
  id: number;
  coupon: string;
  discountValue: number | string;
  discountType: string;
};

export type cartProcessType = {
  userId: string;
  productId: string;
  quantity: number;
};

export type couponCheckerType = {
  coupon: string;
  userId: string;
};
