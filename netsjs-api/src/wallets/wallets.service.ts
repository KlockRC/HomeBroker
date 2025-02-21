import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import mongoose, { Model } from 'mongoose';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Walletasset } from './entities/wallet-asset.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private WalletSchema: Model<Wallet>,
    @InjectModel(Walletasset.name)
    private WalletassetSchema: Model<Walletasset>,
    @InjectConnection() private connection: mongoose.Connection,
  ) {}

  create(createWalletDto: CreateWalletDto) {
    return this.WalletSchema.create(createWalletDto);
  }

  findAll() {
    return this.WalletSchema.find();
  }

  findOne(id: string) {
    return this.WalletSchema.findById(id).populate([
      {
        path: 'assets',
        populate: ['assets'],
      },
    ]);
  }

  async createWalletasset(data: {
    walletId: string;
    assetId: string;
    shares: number;
  }) {
    const session = await this.connection.startSession();
    await session.startTransaction();
    try {
      const docs = await this.WalletassetSchema.create(
        [
          {
            Wallet: data.walletId,
            asset: data.assetId,
            shares: data.assetId,
          },
        ],
        { session },
      );
      const Walletasset = docs[0];
      await this.WalletSchema.updateOne(
        { _id: data.walletId },
        {
          $push: { assets: Walletasset._id },
        },
        {
          session,
        },
      );
      await session.commitTransaction();
      return Walletasset;
    } catch (e) {
      console.error(e);
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
  }
}
