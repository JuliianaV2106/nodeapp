import express,{Request,Response} from "express";
import { userController } from "../controllers";
import {auth} from "../middlewares/auth.middleware";
import { userSchema } from "../schemas";
import { validateSchema } from "../middlewares";

export const router = express.Router();

router.get("/",auth, userController.getAll);

router.get("/:profile",auth, userController.getById);

router.get("/:id", userController.getById);

router.put("/:id", userController.update);

router.delete("/:id", userController.delete);

router.post("/", userController.create);

router.post("/",validateSchema(userSchema), userController.create);

router.post("/login", userController.login);






