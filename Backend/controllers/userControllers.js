import User from '../model/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;
    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ message: "Username already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const maleProflePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleProflePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;

    await User.create({
      fullName,
      userName,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProflePhoto : femaleProflePhoto,
      gender
    });
    return res.status(201).json({ message: "User registered successfully", success: true });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",

    });
    console.log("Register error: ", error);

  }
}

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    };
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false
      });
    };
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false
      })
    };

    const tokenData = {
      userId: user._id
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
    return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
      _id: user._id,
      userName: user.userName,
      fullName: user.fullName,
      profilePhoto: user.profilePhoto
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log()
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log("Logout error: ", error);

  }
}

export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.id;
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
    return res.status(200).json(otherUsers);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
}