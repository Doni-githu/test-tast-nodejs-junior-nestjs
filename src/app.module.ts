import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { MongooseModule } from "@nestjs/mongoose"

@Module({
  imports: [ContactsModule, MongooseModule.forRoot('mongodb+srv://doni:4jMbpjwz76AQUDxt@cluster2.y0ompzd.mongodb.net/?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
