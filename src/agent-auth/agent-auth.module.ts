import { Module } from '@nestjs/common';
import { AgentAuthService } from './agent-auth.service';
import { AgentAuthController } from './agent-auth.controller';

@Module({
  providers: [AgentAuthService],
  controllers: [AgentAuthController],
})
export class AgentAuthModule {}
