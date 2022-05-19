import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAgentLogin, IAgentRegister } from './agent-auth.interface';
import { AgentModel } from './agent-auth.model';
import { generate, verify } from 'password-hash';
import { JwtService } from 'src/jwt.service';
import * as macaddress from 'macaddress';

@Injectable()
export class AgentAuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('Agent') private agentModel: Model<AgentModel>,
  ) {}

  // Register Agent
  async onAgentRegister(body: IAgentRegister) {
    const checkDupEmail = await this.agentModel.count({ email: body.email });
    if (checkDupEmail > 0) {
      throw new BadRequestException('This email is registered.');
    }
    body.image = '';
    const dataModel: IAgentRegister = body;
    dataModel.password = generate(dataModel.password);
    const newAgent = new this.agentModel(dataModel);
    const result = await newAgent.save();
    return result;
  }

  async onAgentLogin(body: IAgentLogin) {
    const agentEmail = await this.agentModel.findOne({ email: body.email });
    if (!agentEmail) {
      throw new BadRequestException('this email is not correct');
    }

    // check mac address
    const appId: string = await macaddress.one();
    console.log('appId', appId, agentEmail._id);

    console.log('agentEmail.mac', agentEmail.mac);
    if (!agentEmail.mac) {
      const updateAppId = await this.agentModel.findByIdAndUpdate(
        agentEmail._id,
        {
          mac: appId,
        },
      );
      if (!updateAppId) {
        throw new BadRequestException('Cannot update App ID');
      }
    } else {
      // check ว่า mac ตรงกันไหม
      if (agentEmail.mac !== appId) {
        throw new BadRequestException('This account is already use.');
      }
    }

    // Varidate password
    if (verify(body.password, agentEmail.password)) {
      return {
        accessToken: await this.jwtService.generateAccessToken(agentEmail),
      };
    }
    throw new BadRequestException('Email or Password is not correct');
  }
}
