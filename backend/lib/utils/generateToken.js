import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
	const dbc =
    "7e688e1cc6dae02c5dab26e5559805d490e99ae3970a6ed9be95b4d5374b7d6a68318d895adf2a75bf5f003f9f56a89445c1ae1313297d31ed71684ef2af187a";
	const token = jwt.sign({ userId }, dbc, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		maxAge: 15 * 24 * 60 * 60 * 1000, //MS
		httpOnly: true, // prevent XSS attacks cross-site scripting attacks
		sameSite: "strict", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV !== "development",
	});
};
