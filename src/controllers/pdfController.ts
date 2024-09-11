import { Request, Response } from "express";
import ticketService from "../services/ticketService.js";
import pdfService from "../services/pdfService/pdfService.js";
class PDFcontroller {
  async getTicketPdf(req: Request, res: Response) {
    const ticketId = req.params.id;
    const user = req?.user;
    const ticket = await ticketService.getTicketById(Number(ticketId));
    if (!ticket || !user) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-disposition": "attachment; filename=qr.pdf",
    });
    pdfService.generatePDF(
      ticket,
      user,
      (chunk: Buffer) => stream.write(chunk),
      () => stream.end()
    );
  }
}

export default new PDFcontroller();
