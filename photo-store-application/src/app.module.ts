import { Module } from '@nestjs/common';
import { PhotoCameraController } from './controllers/PhotoCameraController';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PHOTO_CAMERA_APPLICATION, SECRET_KEY } from './configuration/Constraints';
import { UsersService } from './auth/UsersService';
import { LocalStrategy } from './auth/LocalStrategy';
import { AuthService } from './auth/AuthService';
import { AppController } from './controllers/AppController';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/JwtStrategy';
import { FirebaseController } from './controllers/FirebaseController';

@Module({
  imports: [ClientsModule.register([{
    name: PHOTO_CAMERA_APPLICATION,
    transport: Transport.TCP,
    options: {
      host: 'host.docker.internal', // only for Docker!
      port: 3002,
    },
  }]),
    PassportModule,
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '10 days' },
    }),
  ],
  controllers: [AppController, PhotoCameraController, FirebaseController],
  providers: [UsersService, AuthService, LocalStrategy, JwtModule, JwtStrategy],
  exports: [UsersService],
})
export class AppModule {}
