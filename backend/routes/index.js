import Express from "express";
import {check, body, validationResult} from "express-validator";
import { 
    getAllProducts,
    createProduct,
    getAllProductsById,
    updateProduct,
    deleteProduct
} from "../controllers/product.js";
import { getUsers,registerUser,loginUser,logoutUser} from "../controllers/auth.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { resfreshToken } from "../controllers/refreshToken.js";
import { registerSchema,loginSchema } from "../rules/usersValidator.js";
import { productSchema } from "../rules/productValidator.js"; 

const router = Express.Router();

router.get('/users',verifyToken, getUsers);
router.post('/users',registerUser);
router.post('/login',loginUser);
router.get('/token',resfreshToken);
router.delete('/logout', logoutUser);


router.get('/products',verifyToken, getAllProducts);
router.post('/products',productSchema, createProduct);
router.get('/products/:id', getAllProductsById);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct)

export default router;