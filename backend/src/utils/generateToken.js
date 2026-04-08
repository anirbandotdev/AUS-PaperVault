import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config.js";

export const generateAccessToken = (data) => {
    return jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: "1hr" });
};

export const generateRefreshToken = (data) => {
    return jwt.sign(data, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
