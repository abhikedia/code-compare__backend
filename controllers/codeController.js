const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const compileCode = async (req, res) => {
  try {
    const { language, code } = req.body;
    const uuid = uuidv4();
    fs.writeFileSync(`example-${uuid}.cpp`, language);
    console.log(language, "\n", code);
    res.status(200).json({
      status: "success",
      message: "code received!",
    });
  } catch (e) {
    res.status(400).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

module.exports = compileCode;
