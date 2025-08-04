import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Access Denied. No token provided." });
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token", error: error.message });
  }
};
