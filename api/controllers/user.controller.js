import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
    res.send("API route is working");
};

export const getUser = async (req, res, next) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({ username: username });
        if (!user) return next(errorHandler(404, "User not found"));
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorHandler(401, "You can only update your own account!"));
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.user.id != req.params.id)
        return next(errorHandler(401, "You can only delete your own account"));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("access_token");
        res.status(200).json("User has been deleted");
    } catch (error) {
        next(errorHandler(401, "User doesnt exist"));
    }
};

export const changePassword = async (req, res, next) => {
    try {
        const { username, currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return next(
                errorHandler(400, "Current password and new password are required")
            );
        }
        const user = await User.findOne({ username: username });
        if (!user) return next(errorHandler(404, "User not found"));

        const passwordMatch = bcryptjs.compareSync(currentPassword, user.password);
        if (!passwordMatch)
            return next(errorHandler(400, "Invalid current password"));

        user.password = bcryptjs.hashSync(newPassword, 10);
        await user.save();
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        next(error);
    }
};
