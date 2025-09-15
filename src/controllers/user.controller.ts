import { Request, Response } from 'express';
import { UserDocument } from '../models';
import { UserInput, UserInputUpdate, UserLogin } from '../interfaces';
import { userService } from '../services';
import { use } from 'react';

class UserController{
    public async create(req: Request, res: Response) {
        try {
            const newUser: UserDocument= await userService.create(req.body as UserInput);
            res.status(201).json(newUser);
        } catch (error) {
            if(error instanceof ReferenceError) {
                res.status(400).json({ message: "User already exists with this email" });
            }
            else {
                res.status(500).json(error);
            }
        }
    }
    

    public async getAll(req: Request, res: Response) {
        try {
            const users: UserDocument[] = await userService.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json(error);
            
        }
    }

    public async getById(req: Request, res: Response) {
            try {
            const id: string = req.params.id || "";
            const user: UserDocument | null = await userService.getById(id);
            if(user == null){
                res.status(404).json({message: `User with id ${id} not found`})
                return;
            }
            res.json(user);
            
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const id: string = req.params.id || "";
            const user: UserDocument | null = await userService.update(id, req.body as UserInputUpdate);
            if(user == null){
                res.status(404).json({message: `User with id ${id} not found`})
            }
            res.json(user)
        } catch (error) {
           res.status(500).json(error); 
        }
        
    }

    public async delete(req: Request, res: Response) {

        try {
            const id: string = req.params.id || "";
            const user: UserDocument | null = await userService.delete(id, req.body as UserInput);
            if(user == null){
                res.status(404).json({message: `User with id ${id} not found`})
            }
            res.send(`Delete User with ID: ${req.params.id}`);
        } catch (error) {
            throw(error)
        }
        
    }

    public async login(req: Request, res: Response) {
        try {
            const user: UserDocument | undefined = await userService.login(req.body as UserLogin);
            res.json(user);
        } catch (error) {
            if(error instanceof ReferenceError) {
                res.status(401).json({ message: "Not Authorize" });
                return;
            }   
            res.status(500).json(error);
        }
       
    }

}

export const userController = new UserController();