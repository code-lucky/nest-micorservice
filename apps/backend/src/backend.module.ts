import { Module } from '@nestjs/common';
import { BackendController } from './backend.controller';
import { BackendService } from './backend.service';
import { PrismaModule } from '@app/prisma';
import { EmailModule } from '@app/email';
import { RedisModule } from '@app/redis';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PrismaModule,
    EmailModule,
    RedisModule,
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: 'test',
          signOptions: {
            expiresIn: '30m' // 默认 30 分钟
          }
        }
      }
    }),
    
  ],
  controllers: [BackendController],
  providers: [BackendService],
})
export class BackendModule {}
