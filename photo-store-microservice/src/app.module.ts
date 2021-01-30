import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import { AppService } from "./services/app.service";
import { PhotoCameraService } from "./services/PhotoCameraService";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PhotoCameraService]
})
export class AppModule {}
