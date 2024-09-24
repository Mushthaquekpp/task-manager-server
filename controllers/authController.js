import User from "../models/user.js";
import jwt from "jsonwebtoken";
import Joi from "joi";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";

// user registration validation using joi
const registerSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.alphanum": "Name must contain only alphanumeric characters",
    "string.min": "Name must contain atleast 3 character long",
    "string.max": "Name must not exceed 30 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
  }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "string.pattern.base":
        "Password must include at least one uppercase, one lowercase, one number, and one special character",
    }),
});

//user login validation using joi

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address",
  }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({ "string.min": "Password must be at least 6 characters long" }),
});

//user registration
export const registerUser = async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    console.log({ userExists });

    if (userExists) res.status(409).json({ error: "Email already registered" });

    const hashedPassword = await hashPassword(password);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    console.log({ user });

    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log({ error });
    res.status(500).json({ error: "Something went wrong while creating user" });
  }
};

//user login

export const loginUser = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email is not registered" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Password incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.log({ error });

    res.status(400).json({ error: "Error loggin in user" });
  }
};
