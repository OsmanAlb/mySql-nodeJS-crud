import express, { Request, Response, NextFunction } from "express";
import * as productController from "./controllers/product.controller";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Enable JSON body parsing

// Routes
app.get("/api/", productController.getAllProducts);
app.get("/api/:id", productController.getProductById);
app.post("/api/create", productController.addProduct);
app.put("/api/:id/update", productController.updateProduct);
app.delete("/api/:id/delete", productController.deleteProduct);

// Centralized error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Server listening
app.listen(PORT, () => {
    console.log(`Server is running`);
});
