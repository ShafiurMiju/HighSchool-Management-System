import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MessageEntity } from './message.entity';

@Entity("Guest")
export class GuestEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  Name: string;

  @Column()
  UserName: string;

  @Column()
  Email: string;

  @Column()
  ContactNumber: number;

  @Column()
  Address: string;

  @Column()
  Password: string;

  @OneToMany(() => MessageEntity, (message) => message.Guest)
  Messages: MessageEntity[];
}