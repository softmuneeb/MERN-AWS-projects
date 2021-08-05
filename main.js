const HTMLtoDOCX = require("html-to-docx");

const init = async () => {
  const a = await HTMLtoDOCX(
    '<html><body><divclass="container"><h1>404</h1></div></body></html>'
  );
  const fs = require("fs");
  await fs.writeFile("filename1.docx", a);
  console.log("a: ", a);
};

init();
