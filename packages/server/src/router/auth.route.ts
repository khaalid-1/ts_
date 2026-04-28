import { Router } from "express";
import { loging, singup } from "../controller/auth.controller";
import { validate } from "../middleware/validate";
import { loginSchema, signSchema } from "../validator/validator";

const router = Router();

router.post("/",validate(signSchema), singup);
router.get("/",validate(loginSchema),loging);

export default router;