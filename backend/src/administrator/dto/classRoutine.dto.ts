import { IsNotEmpty } from "class-validator";

export class classRoutineDTO{
    ID: number;

    File: string;

    CreatedDate: Date;

    @IsNotEmpty({message: "Expired Date is Null"})
    ExpiredDate: Date;

    @IsNotEmpty({message: "Class is Empty"})
    Class: number;

    @IsNotEmpty({message: "Section is Empty"})
    Section: number;

}