// middleware/validate.js
module.exports = (schema) => (req, res, next) => {
  const { error } = schema.validate({ body: req.body }, { abortEarly: false });
  if (error) {
    console.error("Validation error:", error.details.map(d => d.message));
    return res.status(400).json({ message: error.details[0].message });
  }
  console.log("Validation passed:", req.body);
  next();
};