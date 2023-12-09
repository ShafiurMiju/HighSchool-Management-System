import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity("SchoolInfo")
export class SchoolInfoEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  SchoolName: string;

  @Column()
  Address: string;

  @Column()
  ContactNumber: number;

  @Column()
  PrincipalName: string;

  @Column()
  Logo: string;

  @Column()
  SchoolInfo: string;

  @Column()
  Email: string;
}
