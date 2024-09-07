import { Request, Response } from "express";
import authService from "../services/authService.js";
import bycrypt from "bcrypt";
class AuthController {
  async signup(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }
      const checkUser = await authService.findUser(email);

      if (checkUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const createdUser = await authService.createUser(email, password);
      if (createdUser) {
        res.status(201).json("User created successfully");
      } else {
        res.status(500).json("Internal server error");
      }
    } catch (error) {
      throw error;
    }
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await authService.findUser(email);

    if (!user) {
      return res.status(401).json({
        message: "Wrong email",
      });
    }
    console.log(user);

    const isPasswordValid = await bycrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }
    const accessToken = await authService.generateAccessToken(
      user.id,
      user.roleid,
      user.email
    );

    res.status(200).json({
      accessToken,
      userid: user.id,
      email: user.email,
      roleid: user.roleid,
    });
  }

  async logout(_req: Request, res: Response) {
    res.status(200).json({ message: "Logout successful" });
  }
}

export default new AuthController();
