import { check, body } from "express-validator";
import Users from "../models/usersModel.js";

const register = [
    body('username')
    .notEmpty()
    .withMessage('username must be filled'),

    check('username')
        .custom((value) => {
            return Users.findOne({ where: { username: value } })
                .then(user => {
                    if (user != null) {
                        return Promise.reject('Username already taken')
                    }
                })
        }),

    body('name')
        .notEmpty()
        .withMessage('name must be filled'),

    body('email')
        .notEmpty()
        .withMessage('email must be filled')
        .isEmail()
        .withMessage('Invalid email'),

    check('email')
        .custom((value) => {
            return Users.findOne({ where: { email: value } })
                .then(user => {
                    if (user != null) {
                        return Promise.reject('Email already taken')
                    }
                })
        }),


    body('password')
        .notEmpty()
        .withMessage('password must be filled')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('must contain a number'),

];


const login = [
    body('email')
        .notEmpty()
        .withMessage('email must be filled')
        .isEmail()
        .withMessage('Invalid email'),

    body('password')
        .notEmpty()
        .withMessage('password must be filled')
];



export { register as registerSchema, login as loginSchema };