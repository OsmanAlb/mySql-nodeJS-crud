import express, { Request, Response, NextFunction } from "express";
import * as productController from "./controllers/product.controller";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Enable JSON body parsing

// Routes
app.get("/api/", productController.getAllProducts);
app.get("/api/:id", productController.getProductById);
app.post("/api/", productController.addProduct);
app.put("/api/:id", productController.updateProduct);
app.delete("/api/:id", productController.deleteProduct);

// Centralized error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Server listening
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
