import { Request, Response } from "express";
import userService from "../services/userService.js";
import ticketService from "../services/ticketService.js";
class UserController {
  async getUser(req: Request, res: Response) {
    const userId = req?.user?.id;

    const userInfo = await userService.findUser(Number(userId));

    return res.status(200).json({
      id: userInfo.id,
      email: userInfo.email,
      roleid: userInfo.roleid,
      money: userInfo.money,
    });
  }

  async getUserBoughtTickets(req: Request, res: Response) {
    const id = req.user?.id;

    const tickets = await ticketService.getUserBoughtTickets(Number(id));

    return res.status(200).json(tickets);
  }
}

export default new UserController();
