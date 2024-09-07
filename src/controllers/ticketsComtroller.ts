import { Response, Request } from "express";

import ticketService from "../services/ticketService.js";
class TicketsController {
  async getAllTickets(_req: Request, res: Response) {
    const tickets = await ticketService.getAllTickets();
    if (!tickets[0]) {
      return res.status(404).json({ message: "Tickets not found" });
    }
    res.status(200).json(tickets);
  }

  async getTicketById(req: Request, res: Response) {
    const { id } = req.params;
    const ticket = await ticketService.getTicketById(Number(id));
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(ticket);
  }

  async createTicket(req: Request, res: Response) {
    const { title, description, amount, price } = req.body;
    const ticket = await ticketService.createTicket(
      title,
      description,
      amount,
      price
    );
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not created" });
    }

    res.status(201).json(ticket);
  }

  async deleteTicket(req: Request, res: Response) {
    const { id } = req.params;
    await ticketService.deleteTicket(Number(id));

    res.status(200).json({ message: "Ticket deleted" });
  }

  async updateTicket(req: Request, res: Response) {
    const { id } = req.params;
    const { title, description, amout, price } = req.body;
    const updatedTicket = await ticketService.updateTicket(
      Number(id),
      title,
      description,
      amout,
      price
    );
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(updatedTicket);
  }
}
export default new TicketsController();
