import { Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { Wallet, WalletSchema } from './entities/wallet.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Walletasset, WalletassetSchema } from './entities/wallet-asset.entity';

@Module({
  imports: [ 
     MongooseModule.forFeature([
       {
        name: Wallet.name,
        schema: WalletSchema,
      },
      {
        name: Walletasset.name,
        schema: WalletassetSchema,
      },
     ]),
 ],
  controllers: [WalletsController],
  providers: [WalletsService],
})
export class WalletsModule {}
