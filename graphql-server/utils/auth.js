import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables.");
}

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (input, stored) => {
  return await bcrypt.compare(input, stored);
};

export const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
    },
    SECRET,
    { expiresIn: "1d" }
  );
};

export const getUserFromToken = (token) => {
  try {
    if (!token) return null;

    const cleanedToken = token.replace("Bearer ", "");
    return jwt.verify(cleanedToken, SECRET);
  } catch (err) {
    console.error("Invalid token:", err.message);
    return null;
  }
};
