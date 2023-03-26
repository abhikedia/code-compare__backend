const compileCode = async (req, res) => {
  try {
    const { language, code } = req.body;
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
