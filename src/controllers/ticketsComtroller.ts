import { Response, Request } from "express";

class TicketsController {
  async getAllTickets(req: Request, res: Response) {
    res.send(`All tickets ${req.user?.email}`);
  }
}
export default new TicketsController();
