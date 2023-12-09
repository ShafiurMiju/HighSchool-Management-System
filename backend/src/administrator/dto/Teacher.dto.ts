import { IsNotEmpty, IsEmail, IsPhoneNumber, IsDate } from 'class-validator';

export class TeacherDTO {
  ID: number;

  @IsNotEmpty({ message: 'First name is required' })
  FirstName: string;

  @IsNotEmpty({ message: 'Last name is required' })
  LastName: string;

  @IsEmail({}, { message: 'Invalid email format' })
  Email: string;

  @IsNotEmpty({ message: 'Contact Number is required' })
  ContactNumber: string;

  @IsNotEmpty({ message: 'Date Of Birth is required' })
  DateOfBirth: Date;

  @IsNotEmpty({ message: 'Gender is required' })
  Gender: string;

  @IsNotEmpty({ message: 'Education is required' })
  Education: string;

  @IsNotEmpty({ message: 'Teacher password is required' })
  Password: string;

  ProfilePicture: string;

}
