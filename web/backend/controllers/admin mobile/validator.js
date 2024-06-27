const ValidateFunc = (req, res, next) => {
  console.log('Middleware executed');
  // Call next middleware function
  next();
};

export default ValidateFunc;