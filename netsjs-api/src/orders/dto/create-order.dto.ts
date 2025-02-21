import { Ordertype } from 'src/orders/entities/order.entity';
export class CreateOrderDto {
  walletId: string;
  assetId: string;
  shares: number;
  price: string;
  type: Ordertype;
}
