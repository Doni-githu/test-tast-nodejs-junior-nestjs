import { Controller, Get, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto'
import { TokenService } from 'src/token.service';



@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService, private readonly tokenService: TokenService) { }


  @Get()
  async createDeal(@Query() data: CreateContactDto) {
    const leads = await this.contactsService.createDealService(data)
    return leads
  }

  @Get("/code")
  async getCode(@Query() { code }: { code: string }) {
    const result = await this.tokenService.getAccessTokenFromAmoCRMByCode(code)
    return {
      message: "Good you are authenticated"
    }
  }
}
