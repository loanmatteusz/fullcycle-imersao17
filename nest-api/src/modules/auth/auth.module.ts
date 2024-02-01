import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';

@Global()
@Module({
  imports: [JwtModule.register({
    global: true,
    secret: "123456",
    signOptions: { expiresIn: "1h" },
  })],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard],
})
export class AuthModule {}
