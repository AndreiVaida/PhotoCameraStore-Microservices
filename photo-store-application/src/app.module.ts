import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PHOTO_CAMERA_APPLICATION } from "./configuration/Constraints";

@Module({
  imports: [ClientsModule.register([{
    name: PHOTO_CAMERA_APPLICATION,
    transport: Transport.TCP,
    options: {
      // host: PHOTO_CAMERA_APPLICATION,
      port: 3002,
    },
  }])],
  controllers: [AppController],
})
export class AppModule {}
