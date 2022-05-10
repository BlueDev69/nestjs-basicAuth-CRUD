import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AgentAuthModule } from './agent-auth/agent-auth.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(
      `mongodb+srv://kittanat:8rGkDvgVDI6HbL1m@cluster1.cxq59.mongodb.net/test?retryWrites=true&w=majority`,
    ),
    AgentAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
