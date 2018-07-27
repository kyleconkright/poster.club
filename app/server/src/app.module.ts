import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseService } from 'firebase.service';
import { ScalablePressService } from 'scalable-press.service';
import { ChargeController } from 'Controllers/charge.controller';

@Module({
  imports: [],
  controllers: [AppController, ChargeController],
  providers: [
    AppService,
    FirebaseService,
    ScalablePressService,
  ]
})

export class AppModule {}
