import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');
const ordersFilePath = path.join(process.cwd(), 'data', 'orders.json');

export const getProducts = () => {
  const fileData = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(fileData);
};

export const saveProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

export const getOrders = () => {
  const fileData = fs.readFileSync(ordersFilePath, 'utf-8');
  return JSON.parse(fileData);
};

export const saveOrders = (orders) => {
  fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
};
