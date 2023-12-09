import { IsString, IsEmail, IsPhoneNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class SchoolInfoDTO {
  ID: number;

  @IsNotEmpty({ message: 'School name cannot be empty' })
  SchoolName: string;

  @IsNotEmpty({ message: 'Address cannot be empty' })
  Address: string;

  @IsNotEmpty({ message: 'Contact number cannot be empty' })
  ContactNumber: string;

  @IsNotEmpty({ message: 'Principal name cannot be empty' })
  PrincipalName: string;

  Logo: string;

  @IsNotEmpty({ message: 'School info cannot be empty' })
  SchoolInfo: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  Email: string;
}
