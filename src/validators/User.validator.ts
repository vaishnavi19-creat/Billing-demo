import { body } from "express-validator";

export class UserValidator {
    
  static validateUser(){
    return[
        body('username').isString().notEmpty().withMessage('Username is required'),
        body('Email', 'Please provide a valid email address.').notEmpty().trim().escape().isEmail().withMessage('Invalid email format'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('role').isIn(['admin', 'shop_owner']).withMessage('Role must be admin or shop_owner')
    ];
}


static validateUserByemail()
{
  return[
    body('Email', 'Please provide a valid email address.').notEmpty().trim().escape().isEmail().withMessage('Invalid email format'),

  ]
}

static validateFilterUser(){
  return[
    body('username').isString().notEmpty().withMessage('Username is required'),
    body('Email', 'Please provide a valid email address.').notEmpty().trim().escape().isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').isIn(['admin', 'shop_owner']).withMessage('Role must be admin or shop_owner')
  ]
}

static validatepatchUser(){
  return[
    body('Email', 'Please provide a valid email address.').notEmpty().trim().escape().isEmail().withMessage('Invalid email format'),
  ]

}
}

  







