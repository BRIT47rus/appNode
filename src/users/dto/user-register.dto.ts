import { IsEmail,  IsString } from "class-validator";

export  class UserRegisterDTO{
    @IsEmail({},{message:'неверный email'})
    email:string;
    @IsString({message:'Не указано имя'})
    name:string;
    @IsString({message:'Не указан пароль'})
    password:string;
    constructor(){
        this.email=''
        this.name= ''
        this.password=''
    }
}