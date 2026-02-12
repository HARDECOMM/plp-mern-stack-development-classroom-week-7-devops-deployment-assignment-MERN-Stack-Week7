const router = require("express").Router();
const authController = require("../controllers/authController");
const validate = require("../middleware/validate");
const Joi = require("joi");
const auth = require("../middleware/auth");

// Validation schemas
const registerSchema = Joi.object({
  body: Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    bio: Joi.string().allow(""),
  })
});

const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.get('/me', auth, authController.getMe);

module.exports = router;
