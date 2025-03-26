import  User  from '../model/userModel.js'
import bcrypt from 'bcrypt'

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
      password:hashedPassword,
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