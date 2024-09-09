import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
	try {
		const token = req.cookies.jwt;
		if (!token) {
			return res.status(401).json({ error: "Unauthorized: No Token Provided" });
		}
		const dbc =
      "7e688e1cc6dae02c5dab26e5559805d490e99ae3970a6ed9be95b4d5374b7d6a68318d895adf2a75bf5f003f9f56a89445c1ae1313297d31ed71684ef2af187a";

		const decoded = jwt.verify(token, dbc);

		if (!decoded) {
			return res.status(401).json({ error: "Unauthorized: Invalid Token" });
		}

		const user = await User.findById(decoded.userId).select("-password");

		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		req.user = user;
		next();
	} catch (err) {
		console.log("Error in protectRoute middleware", err.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
