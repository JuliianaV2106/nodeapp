import express,{Request,Response} from "express";

export const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Get All Users");
});

router.get("/:id", (req: Request, res: Response) => {
  res.send(`Get User with ID: ${req.params.id}`);
});

router.put("/:id", (req: Request, res: Response) => {
  res.send(`Change User with ID: ${req.params.id}`);
});

router.delete("/:id", (req: Request, res: Response) => {
  res.send(`Delete User with ID: ${req.params.id}`);
});

router.post("/", (req: Request, res: Response) => {
  //console.dir(req);
  let user = ` name: ${req.body.name}, email: ${req.body.email}, password: ${req.body.password}`;
  res.send(`User created: ${user}`);

});


