import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import config from "../config";

import OrdersModel from "../models/orders";

const ordersModel = new OrdersModel();

// all orders controllers here

// createOrder
export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // destructuring the user from the request body
    const { user_id, status } = req.body;

    if (!user_id || !status) {
      throw new Error("user_id and status are required");
    }

    const order = await ordersModel.createOrder({ user_id, status });

    res.status(201).json({
      status: "success",
      message: "order created successfully",
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};

// getOrders
export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await ordersModel.getOrders();

    res.status(200).json({
      status: "success",
      message: "order retrieved successfully",
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};

// getOrder
export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new Error("id is required");
    }

    if (isNaN(parseFloat(id)) || !isFinite(+id)) {
      return res.status(400).json({
        status: "error",
        message: "id must be a number",
      });
    }

    const order = await ordersModel.getOrder(
      req.params.id as unknown as string
    );

    res.status(200).json({
      status: "success",
      message: "order retrieved successfully",
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};

// deleteOrder
export const deleteOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new Error("id is required");
    }

    if (isNaN(parseFloat(id)) || !isFinite(+id)) {
      return res.status(400).json({
        status: "error",
        message: "id must be a number",
      });
    }

    const order = await ordersModel.deleteOrder(
      req.params.id as unknown as string
    );

    res.status(200).json({
      status: "success",
      message: "order deleted successfully",
      data: {
        order,
      },
    });
  } catch (error) {
    next(error);
  }
};
