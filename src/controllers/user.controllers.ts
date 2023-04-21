import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user";

const userModel = new UserModel();

// TODO : user express-validator to validate user input

// controller to create a user (controller is just  a function that takes in a request, response, and next function)
// controller is a function to talk to the model and send the response back to the client
// controller is follow mvc pattern (model view controller) and it's a layer between the model and the view (routes in our case)

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.createUser(req.body);

    res.json({
      status: "success",
      message: "user created successfully",
      data: {
        ...user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.getUsers();

    res.json({
      status: "success",
      message: "users retrieved successfully",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getUser(req.params.id as unknown as string);

    res.json({
      status: "success",
      message: "user retrieved successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.updateUser(req.params.id, req.body);

    res.json({
      status: "success",
      message: "user updated successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.deleteUser(req.params.id as unknown as string);

    res.json({
      status: "success",
      message: "user deleted successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
