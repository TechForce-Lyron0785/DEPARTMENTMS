import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { hashPassword, comparePassword, generateToken } from "../utils/auth";
import jwt, { JwtPayload } from "jsonwebtoken";

type AsyncRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const registerUser: AsyncRequestHandler = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password and create the user
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginUser: AsyncRequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const payload = { userId: user._id, role: user.role };
    const token = generateToken(payload);

    return res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

export const verifyToken: AsyncRequestHandler = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Get the token from the Authorization header
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload; // Assert the type to JwtPayload

    // Fetch the user from the database using the ID from the decoded token
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Return the user data
    res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
