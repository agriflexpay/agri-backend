import { Request, Response } from "express";
import UserService from "../services/user/user.service";
import { CreateUserInput } from "../schema/user.schema";
import ResponseService from "../funct/responce"
import TokenService from "../services/token";


class UserController {
    static async register(req: Request<{}, {}, CreateUserInput["body"]>, res: Response) {
        try {
            const user = await UserService.create(req.body);

            return TokenService.generateToken({ user:user, res })
        } catch (error) {
            return ResponseService.error({ res, error });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user: any = await UserService.validate_password({ email, password });

            if (!user) {
              let error = "Invalid email or password";
              return  ResponseService.success({ res,data: error });
              
            }
            if(user===false){
                let error = "Invalid email or password";
                return  ResponseService.success({ res,data: error });
            }

            return TokenService.generateToken({
                res,
                user
            });
        } catch (error) {
            return ResponseService.error({ res, error });
        }

    }
    static async getuser(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await UserService.fetch({ id });
            if (!user) {
                return ResponseService.error({ res, error: "User not found" });
            }
            return ResponseService.success({ res, data: user });
        } catch (error) {
            return ResponseService.error({ res, error });
        }
    }

    static async fetchAllUsers(req:Request,res:Response){
        try{
            const agency_uuid = res?.locals?.user?.agency_uuid
            console.log(agency_uuid)
            const users = await UserService.users({
                agency_uuid
            });
            if(!users){
                return ResponseService.error({res,error:"Users not found"})
            }
            return ResponseService.success({res,data:users})
        }
        catch(error){
            ResponseService.error({res,error})
        }
    }
    static async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await UserService.update({ id, ...req.body });
            if (!user) {
                return ResponseService.error({ res, error: "User not updated" });
            }
            return ResponseService.success({ res, data: user });
        }catch(error){
            return ResponseService.error({ res, error });
        }
    }
    static async uploadAvatar(req: Request, res: Response) {
        try {
            const id = res?.locals?.user?.id;

            if (!req?.body?.file) {
                return ResponseService.error({ res, error: "Image not attached" });
            }
            const user = await UserService.uploadAvatar({file: req?.body?.file });
            
                if(!user){
                    return ResponseService.error({ res, error: "Image not uploaded" });
                }
            const _user = await UserService.avatar({url:user.usersecure_url ?? '',id });
            if (!_user) {
                return ResponseService.error({ res, error: "Image url not saved" });
            }
            return ResponseService.success({ res, data: user });
        } catch (error) {
            return ResponseService.error({ res, error });
        }
    }
    static async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const user = await UserService.delete({ id });
            if (!user) {
                return ResponseService.error({ res, error: "User not deleted" });
            }
            return ResponseService.success({ res, data: user });
        } catch (error) {
            return ResponseService.error({ res, error });
        }
    }
}

export default UserController;