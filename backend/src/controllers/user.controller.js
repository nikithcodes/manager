import { User } from "../models/user.model.js";
import sendEmail from "../utils/sendmail.js";
import jwt from "jsonwebtoken";
import { ApiResponse } from '../utils/ApiResponse.js'
import { ApiError } from "../utils/ApiError.js";


const generateAccessAndRefreshTokens = async (userId) => {
    try {

        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()


        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })


        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating Refresh and Access Token")
    }
}

const emailTemplate = (link) => {
    return `<!DOCTYPE html>
            <html>
            <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
                <div style="max-width: 600px; margin: auto; background: #fff; padding: 30px; border-radius: 8px;">
                <h2>Verify Your Email</h2>
                <p>Thank you for registering. Please click the link below to verify your email address:</p>
                <a href="${process.env.host}/api/v1/user/verify-email?token=${link}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px;">
                    Verify Email
                </a>
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p>${process.env.host}/api/v1/user/verify-email?token=${link}</p>
                <p>— Your Task Manager</p>
                </div>
            </body>
            </html>
`
}

const generateEmailToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.EMAIL_SECRET, { expiresIn: '30m' });
};

const userRegistration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if ([name, email, password].some(field => !field || field.trim() === "")) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            if (!existingUser.isVerified) {
                const verificationToken = generateEmailToken(existingUser._id);
                await sendEmail(email, "Verify your email", emailTemplate(verificationToken));
                return res.status(200).json({ message: "Verification email resent. Please check your inbox." });
            }
            return res.status(409).json({ message: "User already exists with this email" });
        }

        const verificationToken = generateEmailToken();

        const user = await User.create({
            name,
            email,
            password,
            isVerified: false,
            emailToken: verificationToken,
        });


        const newVerificationToken = generateEmailToken(user._id);
        user.emailToken = newVerificationToken;
        await user.save();

        await sendEmail(email, "Verify your email", emailTemplate(newVerificationToken));

        return res.status(200).json({ message: "User registered successfully", user: { name, email } });
    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if ([email, password].some((field) => field?.trim() === "")) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid password !" });
        }

        if (!user.isVerified) {
            const verificationToken = generateEmailToken(user._id);
            await sendEmail(email, "Verify your email", emailTemplate(verificationToken));
            return res.status(200).json({ message: "Please verify your email before moving forward" });
        }

         const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }


        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)


        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                message: "User logged in successfully",
                user: { email },
                tokens: { accessToken, refreshToken },
            });
    } catch (error) {
        console.error("Error during user login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const verifyEmail = async (req, res) => {
    try {
        const token = req.query.token;

        if (!token) {
            return res.status(400).send('<h2>Token is required</h2>');
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.EMAIL_SECRET);
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(400).send('<h2>Verification link expired. Please request a new one.</h2>');
            }
            return res.status(400).send('<h2>Invalid token.</h2>');
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).send('<h2>User not found</h2>');
        }

        user.isVerified = true;
        user.emailToken = undefined;
        await user.save();

        return res.send('<h2>Email verified successfully!</h2>');
    } catch (error) {
        console.error('Error during email verification:', error);
        return res.status(500).send('<h2>Internal server error.</h2>');
    }
};


const logoutUser = async (req, res) => {
    const userId = User.findByIdAndUpdate(req.user._id,
        { $set: { refreshToken: undefined } }, { new: true }
    )
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    }


    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
}


const getUser = async (req, res) => {
    try {
        const _id = req.user._id;
        const user = await User.findById(_id).select('name email'); // adjust fields as needed

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ data: user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


const verifyUser = async (req, res) => {
    try {
        const _id = req.user._id

        return res
            .status(200)
            .json(new ApiResponse(200, {}, "User is verfied!"))
    } catch (error) {
        throw new ApiError(401, "Unauthenticated")
    }
}

const refreshAccessToken = async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized Request")
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )


        const user = await User.findById(decodedToken?._id)

        if (!user) {
            throw new ApiError(401, "Invalid refresh Token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is invalid")
        }

        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)


        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    { accessToken, refreshToken: refreshToken },
                    "Access token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh Token")
    }
}


export { userRegistration, userLogin, verifyEmail, logoutUser, getUser, verifyUser, refreshAccessToken }