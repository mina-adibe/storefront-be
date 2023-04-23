import { NextFunction, Request, Response } from "express";

import OrderProductsModel from "../models/orderProducts";

const orderProductsModel = new OrderProductsModel();

export const getOrderProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderProducts = await orderProductsModel.getOrderProducts();

    res.status(200).json({
      status: "success",
      message: "orderProducts retrieved successfully",
      data: {
        orderProducts,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new Error("id is required");
    }

    const orderProduct = await orderProductsModel.getOrderProduct(id);

    res.status(200).json({
      status: "success",
      message: "orderProduct retrieved successfully",
      data: {
        orderProduct,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createOrderProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { order_id, product_id, quantity } = req.body;

    if (!order_id || !product_id || !quantity) {
      throw new Error("order_id, product_id and quantity are required");
    }

    const orderProduct = await orderProductsModel.createOrderProduct({
      order_id,
      product_id,
      quantity,
    });

    res.status(201).json({
      status: "success",
      message: "orderProduct created successfully",
      data: {
        orderProduct,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteOrderProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new Error("id is required");
    }

    const orderProduct = await orderProductsModel.deleteOrderProduct(id);

    res.status(200).json({
      status: "success",
      message: "orderProduct deleted successfully",
      data: {
        orderProduct,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;

    if (!id) {
      throw new Error("id is required");
    }

    const { order_id, product_id, quantity } = req.body;

    if (!order_id || !product_id || !quantity) {
      throw new Error("order_id, product_id and quantity are required");
    }

    const orderProduct = await orderProductsModel.updateOrderProduct(id, {
      order_id,
      product_id,
      quantity,
    });

    res.status(200).json({
      status: "success",
      message: "orderProduct updated successfully",
      data: {
        orderProduct,
      },
    });
  } catch (error) {
    next(error);
  }
};
