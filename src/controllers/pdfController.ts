import { Request, Response } from "express";
import ticketService from "../services/ticketService.js";
import pdfService from "../services/pdfService/pdfService.js";

class PDFcontroller {
  async getTicketPdf(req: Request, res: Response) {
    const user = req?.user;
    const activated_id = req.body.activated_id;
    const ticketWithActivationId = await ticketService.getTicketByActivationId(
      activated_id
    );

    if (!ticketWithActivationId || !user) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    const stream = res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-disposition": "attachment; filename=qr.pdf",
    });
    pdfService.generatePDF(
      ticketWithActivationId,
      user,
      (chunk: Buffer) => stream.write(chunk),
      () => stream.end()
    );
  }

  async validateQrCodeFromPdf(req: Request, res: Response) {
    const activated_id = req.body.activated_id;
    console.log(req.body);

    const resultOfValidation = await ticketService.valiadateTicket(
      activated_id
    );

    return res.status(200).json({ message: resultOfValidation });
  }
}

export default new PDFcontroller();
