import { Injectable } from '@nestjs/common';
import axios from "axios"
import { CreateContactDto } from './dto/create-contact.dto';
import { CreateDeal } from './interfaces/data.deal';
import { UpdateContactDto } from './dto/update-contact.dto';
import { TokenService } from 'src/token.service';


@Injectable()
export class ContactsService {
  baseURL = "https://ddonierov96gmailcom.amocrm.ru/api/v4"
  constructor(private readonly tokenService: TokenService) { }

  async findContactWithEmailOrPhone(email: string, accessToken: string,): Promise<any> {
    const url = this.baseURL + "/contacts"

    const header = {
      Authorization: `Bearer ${accessToken}`
    }

    const params = {
      query: email
    }


    try {
      const response = await axios.get(url, {
        headers: header,
        params
      })

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  
  async findContactWithEmailAndPhone(phone: string, email: string, accessToken: string): Promise<any> {
    const first = this.findContactWithEmailOrPhone(email, accessToken)
    const second = this.findContactWithEmailOrPhone(phone, accessToken)
    if (first) {
      return first
    } else {
      return second
    }
  }

  async createContact(data: CreateContactDto, accessToken: string) {
    const url = this.baseURL + "/contacts"

    const header = {
      Authorization: `Bearer ${accessToken}`
    }

    const data2 = {
      custom_fields_values: [
        {
          field_id: "name",
          values: [
            {
              value: data.name
            }
          ]
        },
        {
          field_id: 'email',
          values: [
            {
              value: data.email
            }
          ]
        },
        {
          field_id: "phone",
          values: [
            {
              value: data.phone
            }
          ]
        }
      ]
    }

    try {
      const response = await axios.post(url, data2, {
        headers: header
      })

      return response.data
    } catch (error) {
      console.log(JSON.stringify(error.response.data))
    }
  }

  async createDeal(data: CreateDeal, accessToken: string) {
    const url = this.baseURL + "/leads"

    const headers = {
      Authorization: `Bearer ${accessToken}`
    }

    const data2 = {
      custom_fields_values: [
        {
          field_id: "created_by",
          values: [
            {
              value: data.id
            }
          ]
        },
      ]
    }

    try {
      const response = await axios.post(url, data2, {
        headers
      })
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      throw new Error("In creating deal have a error fix it")
    }
  }

  async updateContact(data: UpdateContactDto, accessToken: string) {
    const url = this.baseURL + "/contacts/" + data.id

    const header = {
      Authorization: `Bearer ${accessToken}`
    }

    const data2 = {
      custom_fields_values: [
        {
          field_id: "name",
          values: [
            {
              value: data.name
            }
          ]
        },
        {
          field_id: 'email',
          values: [
            {
              value: data.email
            }
          ]
        },
        {
          field_id: "phone",
          values: [
            {
              value: data.phone
            }
          ]
        }
      ]
    }

    try {
      const response = await axios.patch(url, data2, {
        headers: header
      })

      return response.data
    } catch (error) {
      console.log(JSON.stringify(error.response.data))
    }
  }

  async createDealService(data: CreateContactDto) {
    
  }
}