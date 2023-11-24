import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './schemas/token.schema';
import { TokenService } from 'src/token.service';
@Module({
  controllers: [ContactsController],
  providers: [ContactsService, TokenService],
  imports: [MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }])]
})
export class ContactsModule { }
