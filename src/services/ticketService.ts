import { pool as db } from "../db/db.js";
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
}

export default new TicketService();
