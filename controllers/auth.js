const User = require("../models/User");
const bcrypt = require("bcryptjs");

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

exports.create = async (req, res) => {
  try {
    const { email, username, number, password, invite, profilePicture } =
      req.body;

    if (!email || !username || !number || !password) {
      res.status(400).json({
        message: "All fields required!",
      });
    }

    if (!validateEmail(email)) {
      res.status(400).json({
        message: "Email is invalid.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      username,
      number,
      password: hashedPassword,
      invite,
      profilePicture,
    });

    await newUser.save();

    res.status(200).json({
      message: "Registration Successful! Please Login Now!",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  const { username, password, email } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).json({
      message: "This user does not exist!",
    });
  } else {
    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(400).json({
        message: "Password is incorrect!",
      });
    } else {
      return res.status(200).json({
        message: "Login Successful!",
        user,
      });
    }
  }
};
