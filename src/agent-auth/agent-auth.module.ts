import { Module } from '@nestjs/common';
import { AgentAuthService } from './agent-auth.service';
import { AgentAuthController } from './agent-auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AgentAuthSchema } from './agent-auth.model';
import { JwtAuthenStrategy, JwtService } from 'src/jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Agent', schema: AgentAuthSchema }]),
  ],
  providers: [AgentAuthService, JwtService, JwtAuthenStrategy],
  controllers: [AgentAuthController],
})
export class AgentAuthModule {}
