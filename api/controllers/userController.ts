import { Request, Response } from "express";
import User, { IUser } from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = {
        $or: [
          { username: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
        ],
      };
    }
    const users = await User.find(query).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("error fetching user:", error);
    res.status(500).json({ message: "Error fetching user" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;
    const authUser = (req as any).user;

    let updatedUser: any = { username, email };
    if (authUser.role === "admin") {
      updatedUser.role = role;
    }

    const user = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("error deleting user:", error);
    res.status(500).json({ message: "error deleting user" });
  }
};
