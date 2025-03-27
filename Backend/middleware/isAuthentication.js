import jwt from 'jsonwebtoken'

const isAuthentication = async (req, res,next) => { 
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "User Not authenticated " });
    };

    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Invalid token" });
    };
    req.id = decode.userId;
    next();

    
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log("Authentication error: ", error);
  }
}

export default isAuthentication;