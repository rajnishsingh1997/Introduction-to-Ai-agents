const chatController = (req, res, next) => {
  const { message } = req.body;
  console.log(message);
  res.status(200).json({
    success: true,
    message: "reached controller code",
  });
};

export default chatController;
