import { QueryResult } from "pg";
import { pool as db } from "../db/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../types/types.js";

class AuthService {
  async createUser(email: string, password: string) {
    const hashPssword = await bcrypt.hash(password, 5);
    const user: QueryResult<User> = await db.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
      [email, hashPssword]
    );
    return user.rows[0];
  }

  async findUser(email: string) {
    const user: QueryResult<User> = await db.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    return user.rows[0];
  }
  async generateAccessToken(id: number, roleid: number, email: string) {
    const token = jwt.sign(
      {
        id: id,
        roleid: roleid,
        email: email,
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "2h" }
    );

    return token;
  }
}

export default new AuthService();
