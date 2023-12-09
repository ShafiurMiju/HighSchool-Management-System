import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class AcademicNoticeDTO {
  @IsNotEmpty({ message: 'Academic notice title cannot be empty' })
  AcademicNoticeTitle: string;

  @IsNotEmpty({ message: 'Academic notice text cannot be empty' })
  AcademicNoticeText: string;

  AcademicNoticeDate: Date;

  Admin: number
}