import { IsNotEmpty } from "class-validator";

export class classDTO{
    ID:number
    
    @IsNotEmpty({message:"Should not empty"})
    ClassName: string
}