import pdfCreator from "pdfkit";
import svgPaths from "./pdfStyle.js";
import { DataStoredInToken, Ticket } from "../../types/types.js";
class PDFService {
  async generatePDF(
    ticket: Ticket,
    user: DataStoredInToken,
    callbackData: (chunk: Buffer) => void,
    callbackEnd: () => void
  ) {
    const img =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAK9SURBVO3BQQ7cSAwEwSxC//9yro88NSBImrUJRsQ/WGMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoxRrl4qEk/JJKl4RO5Y4kdCpdEn5J5YlijVKsUYo1ysXLVN6UhBOVLgmdSpeETuUOlTcl4U3FGqVYoxRrlIuPJeEOlTuScJKEkyR0Knck4Q6VLxVrlGKNUqxRLv5xKnckYbJijVKsUYo1ysUwSThR6ZIwSbFGKdYoxRrl4mMqX0rCicqJyhMqf5NijVKsUYo1ysXLkvB/UumS0Kl0SehUTpLwNyvWKMUapVijxD8YJAmdSpeETmWSYo1SrFGKNcrFQ0noVLokdCp3JOFEpVO5IwmdykkSOpWTJHQqXRI6lSeKNUqxRinWKBcvS8JJEu5QuSMJJyp3JKFT6ZJwovJLxRqlWKMUa5SLh1S6JHQqXRI6lS4JXRI6lV9SuUOlS0Kn8qVijVKsUYo1ysXHkvCESpeEE5UuCSdJ6FROknCShE6lS0Kn8qZijVKsUYo1ysXHVLokdEnoVLokdCpvUumS8ITK/6lYoxRrlGKNcvEylROVO1ROknCi0iWhU7lDpUvCE0noVJ4o1ijFGqVYo1w8lIRfUjlR6ZJwkoQTlTuScKLSJeFNxRqlWKMUa5SLl6m8KQknKl0S7lDpktAl4Q6VO1TeVKxRijVKsUa5+FgS7lD5pSTcoXKShE6lS0Kn8qZijVKsUYo1ysUwKl0SOpU3JaFTOVH5UrFGKdYoxRrl4h+XhBOVJ5LQqZwk4QmVJ4o1SrFGKdYoFx9T+ZJKl4Q7ktCpdCpdEu5Q+aVijVKsUYo1ysXLkvBLSXhC5SQJX0pCp/JEsUYp1ijFGiX+wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYo/wHVvg7/4ctl0QAAAABJRU5ErkJggg==";
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

    pdfDoc.fontSize(8).text(`Дата покупки ${date.toString()}`, 100, 500);

    pdfDoc.end();
  }
}

export default new PDFService();
