import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/user.model';
import { AgentAuthService } from './agent-auth.service';

@Controller('agent-auth')
export class AgentAuthController {
  constructor(private agentAuthService: AgentAuthService) {}

  @Post('/login')
  @ApiOkResponse({ description: 'User Login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBody({ type: CreateUserDto })
  async login(): Promise<ResponseObject<'user', AuthResponse>> {
    const user = await this.agentAuthService.login(Credential);
    return { user };
  }
}
