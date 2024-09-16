import pdfCreator from "pdfkit";
import svgPaths from "./pdfStyle.js";
import qrCodeService from "../qrCodeService.js";
import { DataStoredInToken } from "../../types/types.js";
type TicketWithActivationId = {
  title: string;
  price: number;
  userid: number;
  activated_id: string;
  img: string;
};
class PDFService {
  async generatePDF(
    ticket: TicketWithActivationId,
    user: DataStoredInToken,
    callbackData: (chunk: Buffer) => void,
    callbackEnd: () => void
  ) {
    console.log(ticket);

    const img = await qrCodeService.generateQrCode(ticket.activated_id);

    const date = new Date();
    const pdfDoc = new pdfCreator({ size: `A5` });
    pdfDoc.on("data", callbackData);
    pdfDoc.on("end", callbackEnd);
    pdfDoc.font("./Arial Unicode MS.ttf");
    pdfDoc.fontSize(24).text("GoTickets", 100, 50);
    pdfDoc.fontSize(12).text(`${ticket.title}`, 130, 170);
    pdfDoc.fontSize(12).text(`Email:${user.email}`, 130, 200);

    pdfDoc.image(img, {
      fit: [200, 300],
      align: "center",
      valign: "center",
    });
    pdfDoc.path(svgPaths.path1).fill("black");

    pdfDoc.path(svgPaths.path5).fill("black");

    pdfDoc.path(svgPaths.path7).fill("black");

    pdfDoc
      .fontSize(8)
      .text(`Дата скачивания билета:${date.toString()}`, 100, 500);

    pdfDoc.end();
  }
}

export default new PDFService();
