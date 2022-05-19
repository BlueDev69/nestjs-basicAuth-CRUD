import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiGatewayTimeoutResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  AgentAuthLoginModel,
  AgentAuthRegisterModel,
} from './agent-auth.model';
import { AgentAuthService } from './agent-auth.service';

@ApiTags('Agent-Auth')
@Controller('agent/auth')
export class AgentAuthController {
  constructor(private readonly agentAuthService: AgentAuthService) {}

  // Agent Register account
  @UseGuards(AuthGuard('jwt'))
  @Post('register')
  @ApiOkResponse({ description: 'Register successfully' })
  @ApiUnauthorizedResponse({ description: 'Invaild credentials' })
  @ApiBadRequestResponse({ description: 'Bad Request Response' })
  @ApiGatewayTimeoutResponse({ description: 'Gateway Timeout' })
  @ApiBody({ type: AgentAuthRegisterModel })
  async register(@Body(new ValidationPipe()) body: AgentAuthRegisterModel) {
    return { data: await this.agentAuthService.onAgentRegister(body) };
  }

  // Agent login
  @Post('login')
  @ApiOkResponse({ description: 'Login successfully' })
  @ApiUnauthorizedResponse({ description: 'Invaild credentials' })
  @ApiBadRequestResponse({ description: 'Bad Request Response' })
  @ApiGatewayTimeoutResponse({ description: 'Gateway Timeout' })
  @ApiBody({ type: AgentAuthLoginModel })
  async login(@Body(new ValidationPipe()) body: AgentAuthLoginModel) {
    return await this.agentAuthService.onAgentLogin(body);
  }
}
