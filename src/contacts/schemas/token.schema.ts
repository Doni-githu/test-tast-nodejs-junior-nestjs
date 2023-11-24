import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
    @Prop()
    access_token: string;

    @Prop()
    refresh_token: string;

    @Prop()
    expires_in: number;
}

export const TokenSchema = SchemaFactory.createForClass(Token);