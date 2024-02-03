import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser } from "../models/userModel.js";
import { getUserByEmail } from "../models/userModel.js";

const createNewUser = async (req, res) => {
  try {
    console.log(req.body);
    const { user } = req.body;

    const newUser = await createUser(user);

    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const {
      user: { email, password },
    } = req.body;

    console.log("loginUser: ", email, password);

    const user = await getUserByEmail({ email });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign({ email: user.email }, "secreto", {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, "secreto");

    const email = decodedToken.email;

    const user = await getUserByEmail({ email });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ users:[user] });
    console.log(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export { createNewUser, loginUser, getUserProfile };
