import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";
import config from "../config";
import ProductsModel from "../models/products";

const productsModel = new ProductsModel();

// all products controllers here
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price, category } = req.body;

    // Validate payload
    if (!name || !price || !category) {
      return res.status(400).json({
        status: "error",
        message: "Name, price, and category are required fields",
      });
    }

    if (typeof name !== "string" || typeof category !== "string") {
      return res.status(400).json({
        status: "error",
        message: "Name and category must be strings",
      });
    }
    if (isNaN(parseFloat(price)) || !isFinite(price)) {
      return res.status(400).json({
        status: "error",
        message: "Price must be a number",
      });
    }

    const product = await productsModel.createProduct(req.body);

    res.json({
      status: "success",
      message: "product created successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

// getProducts

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productsModel.getProducts();

    res.json({
      status: "success",
      message: "product retrieved successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

// getProduct
export const getProduct = async (
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

    const product = await productsModel.getProduct(
      req.params.id as unknown as string
    );

    res.json({
      status: "success",
      message: "product retrieved successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

//  updateProduct
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productsModel.updateProduct(
      req.params.id as unknown as string,
      req.body
    );

    res.json({
      status: "success",
      message: "product updated successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};

//  deleteProduct
export const deleteProduct = async (
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

    const product = await productsModel.deleteProduct(
      req.params.id as unknown as string
    );

    res.json({
      status: "success",
      message: "product deleted successfully",
      data: {
        product,
      },
    });
  } catch (error) {
    next(error);
  }
};
