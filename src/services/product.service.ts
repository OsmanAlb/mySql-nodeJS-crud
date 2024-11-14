import { pool } from "../db";
import { RowDataPacket, OkPacket } from "mysql2";

export const getAllProducts = async (): Promise<RowDataPacket[]> => {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT `id`, `name` FROM `products`");
    return rows;
};

export const getProductById = async (id: number): Promise<RowDataPacket> => {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT `id`, `name` FROM `products` WHERE `id` = ?", [id]);
    return rows[0];
};

export const addProduct = async (data: { name: string, price: number, category_id: number, description: string }): Promise<OkPacket> => {
    const { name, price, category_id, description } = data;
    const [result] = await pool.query<OkPacket>(
        "INSERT INTO `products` (`name`, `price`, `category_id`, `description`) VALUES (?, ?, ?, ?)",
        [name, price, category_id, description]
    );
    return result;
};

export const updateProduct = async (id: number, data: { name: string, price: number, category_id: number, description: string }): Promise<OkPacket> => {
    const { name, price, category_id, description } = data;
    const [result] = await pool.query<OkPacket>(
        "UPDATE `products` SET `name` = ?, `price` = ?, `category_id` = ?, `description` = ? WHERE `id` = ?",
        [name, price, category_id, description, id]
    );
    return result;
};

export const deleteProduct = async (id: number): Promise<OkPacket> => {
    const [result] = await pool.query<OkPacket>("DELETE FROM `products` WHERE `id` = ?", [id]);
    return result;
};
