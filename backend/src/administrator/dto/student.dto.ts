// student.dto.ts
import { IsNotEmpty } from 'class-validator';

export class StudentDTO {
  ID: number;

  @IsNotEmpty({ message: 'First name is required' })
  FirstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  LastName: string;

  @IsNotEmpty({ message: 'Father name is required' })
  FatherName: string;

  @IsNotEmpty({ message: 'Mother name is required' })
  MotherName: string;

  @IsNotEmpty({ message: 'Email is required' })
  Email: string;

  ContactNumber: number;

  @IsNotEmpty({ message: 'Date of birth is required' })
  DateOfBirth: Date;

  @IsNotEmpty({ message: 'Gender is required' })
  Gender: string;

  @IsNotEmpty({ message: 'Address is required' })
  Address: string;

  @IsNotEmpty({ message: 'Student password is required' })
  StudentPassword: string;

  AdmissionDate: Date;

  ProfilePicture: string;

  @IsNotEmpty({ message: 'Status is required' })
  Status: string;
}
