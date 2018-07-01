import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseService } from 'firebase.service';
import { ScalablePressService } from 'scalable-press.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    FirebaseService,
    ScalablePressService,
  ]
})

export class AppModule {}
