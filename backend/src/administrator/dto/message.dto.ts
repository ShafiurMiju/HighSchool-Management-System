import { IsNotEmpty, IsString } from 'class-validator';

export class MessageDTO {
  GMessage: string;

  AMessage: string;

  Date: Date;

  Admin: number;

  Guest: number;
}