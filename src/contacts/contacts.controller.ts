import { Controller, Get, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto'
import { TokenService } from 'src/token.service';



@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService, private readonly tokenService: TokenService) { }


  @Get()
  async createDeal(@Query() data: CreateContactDto) {
    try {
      const access_token = await this.tokenService.getTokenFromMongoDB()
      const result = await this.contactsService.findContactWithEmailAndPhone(data.phone, data.email, access_token)
      if (result) {
        const id = result._embedded.contacts.id
        const updated = await this.contactsService.updateContact({
          id,
          ...data
        }, access_token)
        const newDeal = await this.contactsService.createDeal(updated, access_token)
        return newDeal._embedded.leads

      } else {
        const created = await this.contactsService.createContact(data, access_token)
        const id = created._embedded.contacts.id
        const data2 = {
          id
        }
        const newDeal = await this.contactsService.createDeal(data2, access_token)
        return newDeal._embedded.leads
      }
    } catch (error) {
      console.log('Error in creating deal' + error)
    }
  }

  @Get("/code")
  async getCode(@Query() { code }: { code: string }) {
    const result = await this.tokenService.getAccessTokenFromAmoCRMByCode(code)
    return {
      message: "Good you are authenticated"
    }
  }
}
