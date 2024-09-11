import { pool as db } from "../db/db.js";
import { v4 as uuidv4 } from "uuid";
class TicketService {
  async getAllTickets() {
    const tickets = await db.query("SELECT * FROM tickets");
    return tickets.rows;
  }

  async getTicketById(id: number) {
    const ticket = await db.query("SELECT * FROM tickets WHERE id = $1", [id]);
    return ticket.rows[0];
  }

  async createTicket(
    title: string,
    description: string,
    amount: number,
    price: number
  ) {
    const ticket = await db.query(
      "INSERT INTO tickets (title, description, amount, price) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, amount, price]
    );
    return ticket.rows[0];
  }

  async deleteTicket(id: number) {
    await db.query("DELETE FROM tickets WHERE id = $1", [id]);
  }

  async updateTicket(
    id: number,
    title: string,
    description: string,
    amout: number,
    price: number
  ) {
    const ticket = await db.query(
      "UPDATE tickets SET title = $1, description = $2, amout = $3, price = $4 WHERE id = $5 RETURNING *",
      [title, description, amout, price, id]
    );
    return ticket.rows[0];
  }

  async buyTicket(id: number, userId: number) {
    const client = await db.connect();

    try {
      const ticket = await this.getTicketById(id);

      client.query(" BEGIN; ");

      await client.query("UPDATE users SET money = money - $1 WHERE id = $2", [
        ticket.price,
        userId,
      ]);
      await client.query("UPDATE users SET money = money + $1 WHERE id = $2", [
        ticket.price,
        1,
      ]);

      const updatedTicket = await client.query(
        "UPDATE tickets SET amount = amount - 1 WHERE id = $1 RETURNING *",
        [id]
      );
      client.query(
        "INSERT INTO ticketsToUsers (userID, ticketID, activated_id ) VALUES ($1, $2, $3)",
        [userId, id, uuidv4()]
      );
      await client.query("COMMIT; ");

      return updatedTicket.rows[0];
    } catch (err) {
      await client.query("ROLLBACK;");
      throw err;
    } finally {
      client.release();
    }
  }

  async getUserBoughtTickets(userId: number) {
    const tickets = await db.query(
      `SELECT
    t.title AS title,
    t.price AS price,
    t.img AS img,
    ttu.userid AS userid,
    ttu.activated_id AS activated_id
FROM
    ticketstousers ttu
JOIN
    tickets t ON t.id = ttu.ticketid
WHERE
    ttu.userid = $1; `,
      [userId]
    );
    return tickets.rows;
  }
}

export default new TicketService();
