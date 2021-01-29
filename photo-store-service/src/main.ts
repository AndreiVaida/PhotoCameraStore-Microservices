import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { PHOTO_CAMERA_SERVICE } from "./configuration/Constraints";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.TCP,
        options: {
            // host: PHOTO_CAMERA_SERVICE,
            port: 3002,
            retryAttempts: 5,
            retryDelay: 500,
        },
      },
  );
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
