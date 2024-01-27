import express from "express";
import cors from "cors";
import { logger } from "logger-express";


import userRoutes from "../Backend/config/routes/userRouters.js";
import loginRoutes from "../Backend/config/routes/loginRouters.js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(logger());
app.use("/api/v1", userRoutes);
app.use("/api/v1", loginRoutes);

app.listen(PORT, console.log(`⚡¡Servidor encendido en el 📎! ${PORT}⚡`));
