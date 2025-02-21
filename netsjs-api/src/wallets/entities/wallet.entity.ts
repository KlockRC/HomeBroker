import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import crypto from 'crypto';
import { Walletasset, walletassetDocument } from './wallet-asset.entity';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema({ timestamps: true })
export class Wallet {
  @Prop({ default: () => crypto.randomUUID() })
  _id: string;

  @Prop({
    type: [mongoose.Schema.Types.String],
    set: (v) => [...new Set(v)],
    ref: Walletasset.name,
  })
  assets: walletassetDocument[] | string[];
  createAt!: Date;
  updateAt!: Date;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
