import  express  from "express";  
import { loginUser } from "../../src/api/v1/controllers/usersController.js";
import { validparameters } from "../../middlewares/validparameters.js";

const router = express.Router();

router.post('/login', validparameters, loginUser);

export default router;