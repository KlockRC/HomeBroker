import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import crypto from 'crypto';
import { Asset, AssetDocument } from 'src/assets/entities/asset.entity';
import { Wallet, WalletDocument } from 'src/wallets/entities/wallet.entity';

export type OrderDocument = HydratedDocument<Order>;
export enum OrderStatus {
  PENDING = 'PENDING',
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  FAILED = 'FAILED',
}
export enum Ordertype {
  BUY = 'BUY',
  SELL = 'SELL',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  shares: number;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  partial: number;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  price: number;

  @Prop({ type: String, ref: Wallet.name })
  wallet: WalletDocument | string;

  @Prop({ type: String, ref: Asset.name })
  asset: AssetDocument | string;

  @Prop()
  type: Ordertype;

  @Prop()
  status: OrderStatus;

  createAt!: Date;
  updateAt!: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
