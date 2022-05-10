import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiGatewayTimeoutResponse,
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
  @ApiBody({ type: LoginBody })
  async login(
    @Body('user', ValidationPipe) credentials: LoginDTO,
  ): Promise<ResponseObject<'user', AuthResponse>> {
    const user = await this.agentAuthService.login(credentials);
    return { user };
  }
}
