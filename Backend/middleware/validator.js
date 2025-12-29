const userInputValidator = (req, res, next) => {
  const { message } = req.body;
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return next(new Error("please provide a valid input string"));
  }

  next();
};

export default userInputValidator;
