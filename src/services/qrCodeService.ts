import QRCode from "qrcode";
class QrCodeService {
  async generateQrCode(text: string) {
    console.log(text);

    try {
      const qrcode = await QRCode.toDataURL(text);
      return qrcode;
    } catch (err) {
      throw err;
    }
  }
}

export default new QrCodeService();
