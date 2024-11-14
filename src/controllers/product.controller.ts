import { Request, Response, NextFunction } from "express";
import * as productService from "../services/product.service";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await productService.getAllProducts();
        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: "No products found" });
        }
    } catch (err) {
        next(err);
    }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(Number(id));
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (err) {
        next(err);
    }
};

export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newProduct = await productService.addProduct(req.body);
        res.status(201).json({ message: "Product added", product: newProduct });
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productService.updateProduct(Number(id), req.body);
        if (updatedProduct.affectedRows === 0) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json({ message: "Product updated" });
        }
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const deletedProduct = await productService.deleteProduct(Number(id));
        res.status(200).json({ message: "Product deleted" });
    } catch (err) {
        next(err);
    }
};
