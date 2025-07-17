const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);
 try {
  let error={...err}
  error.message = err.message || 'Internal Server Error';
  console.log('Error:', error.message);

  //mongoose bad ObjectId error
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new Error(message);
    error.statusCode = 404;
  }
  //mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate field value entered: ${err.keyValue.name}`;
    error = new Error(message);
    error.statusCode = 400;
  }
  //mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = new Error(message);
    error.statusCode = 400;
  }
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
  });


 } catch (error) {
    console.error('Error in error middleware:', error);
  next(error);
  
 }
}

export default errorMiddleware;