import { IsNotEmpty } from "class-validator"

export class examDTO{
    ID: number

    @IsNotEmpty({message: "Exam Date is Null"})
    ExamDate: Date

    @IsNotEmpty({message: "Select Exam Type"})
    ExamType: string

    @IsNotEmpty({message: "Select class"})
    Class: number
}