import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import crypto from 'crypto';
import { WalletDocument } from './wallet.entity';
import { Asset, AssetDocument } from 'src/assets/entities/asset.entity';

export type walletassetDocument = HydratedDocument<Walletasset>;

@Schema({ timestamps: true })
export class Walletasset {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  shares: number;

  @Prop({ type: String, ref: 'Wallet' })
  wallet: WalletDocument | string;

  @Prop({ type: String, ref: Asset.name })
  asset: AssetDocument | string;

  createAt!: Date;
  updateAt!: Date;
}

export const WalletassetSchema = SchemaFactory.createForClass(Walletasset);

WalletassetSchema.index({ wallet: 1, asset: 1 }, { unique: true });
