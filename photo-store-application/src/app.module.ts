import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PHOTO_CAMERA_SERVICE } from "./configuration/Constraints";

@Module({
  imports: [ClientsModule.register([{
    name: PHOTO_CAMERA_SERVICE,
    transport: Transport.TCP,
    options: {
      host: "CAMERA_SERVICE",
      port: 3002,
    },
  }])],
  controllers: [AppController],
})
export class AppModule {}
