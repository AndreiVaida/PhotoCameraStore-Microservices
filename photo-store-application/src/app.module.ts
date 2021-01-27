import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PHOTO_CAMERA_SERVICE } from "./configuration/Constraints";

@Module({
  imports: [ClientsModule.register([{ name: PHOTO_CAMERA_SERVICE, transport: Transport.TCP }])],
  controllers: [AppController],
})
export class AppModule {}
