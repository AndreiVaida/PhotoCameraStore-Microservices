import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.TCP,
        options: {
            port: 3002,
            retryAttempts: 5,
            retryDelay: 3000,
            // host: "CAMERA_SERVICE",
        },
      },
  );
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();
