const fs = require("fs");
const HTMLtoDOCX = require("html-to-docx");

const init = async () => {
  const a = await HTMLtoDOCX('<html><body>hi</body></html>');
  await fs.writeFileSync("aoa.docx", a);
};

init();
