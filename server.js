import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
/* الصفحة الرئيسية */
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "index.html")
  );
});
/* صورة الموقع */
app.get("/1.jpeg", (req, res) => {
  res.sendFile(
    path.join(__dirname, "1.jpeg")
  );
});
/* ملف تعريف DNS */
app.get("/GNAWI-dns.mobileconfig", (req, res) => {
  const filePath = path.join(
    __dirname,
    "GNAWI-dns.mobileconfig"
  );
  res.setHeader(
    "Content-Type",
    "application/x-apple-aspen-config"
  );
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="GNAWI-dns.mobileconfig"'
  );
  res.sendFile(filePath, (error) => {
    if (error) {
      console.error(
        "Mobileconfig error:",
        error
      );
      if (!res.headersSent) {
        res.status(404).send(
          "GNAWI DNS profile not found."
        );
      }
    }
  });
});
/* تشغيل السيرفر */
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `GNAWI DNS Server running on port ${PORT}`
  );
});