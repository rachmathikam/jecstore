import { check, body } from "express-validator";

const addProduct = [
    body('nama')
    .notEmpty()
    .withMessage('name must be filled'),
];

export { addProduct as productSchema } ;