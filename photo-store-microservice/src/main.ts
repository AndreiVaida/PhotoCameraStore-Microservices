import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.TCP,
        options: {
            host: '127.0.0.1',
            port: 3002,
            retryAttempts: 5,
            retryDelay: 500,
        },
      },
  );
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();