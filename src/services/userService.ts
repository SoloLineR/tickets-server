import { pool as db } from "../db/db.js";
class UserService {
  async findUser(id: number) {
    try {
      const user = await db.query("SELECT * FROM users WHERE id = $1", [id]);
      return user.rows[0];
    } catch (err) {
      throw err;
    }
  }
}

export default new UserService();
