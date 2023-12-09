import { match } from 'assert';
import { IsNotEmpty, Matches } from 'class-validator';

export class AdministratorPassChangeDTO{
    @IsNotEmpty({message:"Should not empty"})
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,{message: "Password does not meet the criteria."})
    Password:string
}