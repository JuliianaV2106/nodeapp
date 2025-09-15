import bcrypt from "bcrypt";

import { UserDocument, UserModel } from "../models";
import { UserInput, UserInputUpdate, UserLogin } from "../interfaces";
import jwt from "jsonwebtoken";


class UserService {
    public async create(userInput: UserInput): Promise<UserDocument> {

        process.loadEnvFile();
        try{
            const userExists : UserDocument | null = await this.findByEmail(userInput.email,true);
            if (userExists !== null) {
                throw new ReferenceError("User already exists with this email");
            }
            if (userInput.password){
                // const secret = process.env.SECRET || "";
                userInput.password = await bcrypt.hash(userInput.password,10);
            }
        }catch(error){
            throw error;
        }
       return UserModel.create(userInput);
    }
    public findByEmail(email: string, password:boolean = false): Promise<UserDocument | null>{
        // const pass: any = password | 0;
        return UserModel.findOne({email}, {password})
    }

    public async update(id: string, userInput: UserInputUpdate): Promise<UserDocument |null>{
        try {
            const user: UserDocument |null = await UserModel.findOneAndUpdate({_id:id},userInput,{returnOriginal:false});
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async delete(id:string, userInput: UserInput): Promise<UserDocument |null>{
        try {
            const user: UserDocument |null = await UserModel.findOneAndDelete({_id:id},userInput);
            return user;
        } catch (error) {
            throw error;
        }
    }

    public getAll(): Promise<UserDocument[]>{
        return UserModel.find();
    }


    public getById(id:string):Promise<UserDocument | null>{
        return UserModel.findById(id);
    }

    public async login (userLogin:UserLogin): Promise <any>
    {
        const userExists: UserDocument | null = await this.findByEmail(userLogin.email,true);
        if(userExists ==null){
            throw new ReferenceError("Not Authorized");
        }
        const isMatch: boolean = await bcrypt.compare(userLogin.password, userExists.password);
        if(!isMatch){
            throw new ReferenceError("NotAuthorized");
        }
        return{
            user:{
            id: userExists.id,
            email: userExists.email,
            name: userExists.name,
            roles: ["admin"],
            },
            token: await this.generateToken(userExists)
        }
    }

    public async generateToken (user:UserDocument): Promise<string>{
        if(user == null ){
            throw new Error();
        }else{
            return jwt.sign(
                {
                user: {

                    id: user.id,
                    email:user.email,
                    name: user.name
                }
                },
                process.env.SECRET|| "secret_key",
                {expiresIn: "10m"}
            );
        };
    }
}
export const userService = new UserService();
