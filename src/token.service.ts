import { Injectable } from "@nestjs/common";
import { Token } from "./contacts/schemas/token.schema";
import { Model } from "mongoose";
import { IDataToken } from "./contacts/interfaces/data.token";
import { InjectModel } from "@nestjs/mongoose";
import { ID, SECRET_KEY } from "./env";
import axios from "axios";

@Injectable()
export class TokenService {
    constructor(@InjectModel(Token.name) private tokenModel: Model<Token>) { }

    async saveDataToken(data: IDataToken): Promise<IDataToken> {
        const { access_token, refresh_token, expires_in } = data
        const expiredData = (Date.now() + expires_in)
        const secondData = { access_token, refresh_token, expires_in: expiredData }
        try {
            // Имееется ли токен в дата базе
            const hasSameOne = await this.tokenModel.countDocuments()
            if (hasSameOne >= 1) {
                await this.tokenModel.updateMany({}, {
                    $set: secondData
                })
                return secondData
            }
            await this.tokenModel.create({
                access_token,
                refresh_token,
                expires_in: expiredData
            })
            return {
                ...data,
                expires_in: expiredData,
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getAccessTokenFromAmoCRMByRefreshToken(value: string): Promise<string> {
        try {
            const url = 'https://ddonierov96gmailcom.amocrm.ru/oauth2/access_token'
            const response = await axios.post<IDataToken>(url, {
                client_id: ID,
                client_secret: SECRET_KEY,
                grant_type: 'refresh_token',
                refresh_token: value,
                redirect_uri: "https://a0a8-213-230-92-232.ngrok-free.app/contacts/code"
            });
            console.log(response.data);

            const result = await this.saveDataToken(response.data)
            return response.data.access_token
        } catch (error) {
            console.error('Error in getting access token:', error);
        }
    }


    async getAccessTokenFromAmoCRMByCode(value: string): Promise<string> {
        try {
            const url = 'https://ddonierov96gmailcom.amocrm.ru/oauth2/access_token'
            const response = await axios.post<IDataToken>(url, {
                client_id: ID,
                client_secret: SECRET_KEY,
                grant_type: 'authorization_code',
                code: value,
                redirect_uri: "https://a0a8-213-230-92-232.ngrok-free.app/contacts/code"
            });
            console.log(response.data);

            const result = await this.saveDataToken(response.data)
            return response.data.access_token
        } catch (error) {
            console.error('Error in getting access token:', error);
        }
    }

    async getTokenFromMongoDB(): Promise<string> {
        const token = await this.tokenModel.find({}, { access_token: 1 })
        return token[0].access_token
    }
}