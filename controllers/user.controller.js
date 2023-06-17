import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

export const userRegister = async (req, res) => {
  try {
    const { username, password } = req.body;

    const checkUser = await User.findOne({ username });

    if (checkUser)
      return res.status(400).json({
        message: "Username already exists",
      });

    const user = new User({ username });

    user.setPassword(password);

    await user.save();

    res.status(201).json({});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username }).select(
      "username password salt id"
    );

    if (!user)
      return res.status(400).json({
        message: "Username not found",
      });

    if (!user.validatePassword(password))
      return res.status(400).json({
        message: "Wrong Password",
      });

    const token = jwt.sign({ data: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      token,
      username,
      id: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
