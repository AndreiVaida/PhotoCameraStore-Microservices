import { Module } from '@nestjs/common';
import { PhotoCameraController } from './controllers/photoCameraController';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PHOTO_CAMERA_APPLICATION, SECRET_KEY } from './configuration/Constraints';
import { UsersService } from './auth/UsersService';
import { LocalStrategy } from './auth/LocalStrategy';
import { AuthService } from './auth/AuthService';
import { AppController } from './controllers/AppController';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/JwtStrategy';

@Module({
  imports: [ClientsModule.register([{
    name: PHOTO_CAMERA_APPLICATION,
    transport: Transport.TCP,
    options: {
      // host: PHOTO_CAMERA_APPLICATION,
      port: 3002,
    },
  }]),
    PassportModule,
    JwtModule.register({
      secret: SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController, PhotoCameraController],
  providers: [UsersService, AuthService, LocalStrategy, JwtModule, JwtStrategy],
  exports: [UsersService],
})
export class AppModule {}
