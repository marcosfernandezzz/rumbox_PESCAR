class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

const errorHandler = (res, error) => {
  console.error('ERROR:', error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }

  // Errores de Mongoose
  if (error.name === 'CastError') {
    const message = `Recurso no encontrado. ID inválido: ${error.path}: ${error.value}`;
    return res.status(400).json({
      status: 'fail',
      message,
    });
  }

  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(el => el.message);
    const message = `Datos de entrada inválidos. ${errors.join('. ')}`;
    return res.status(400).json({
      status: 'fail',
      message,
    });
  }

  if (error.code === 11000) {
    const value = error.keyValue ? Object.values(error.keyValue)[0] : 'valor duplicado';
    const message = `Valor de campo duplicado: ${value}. Por favor, usa otro valor.`;
    return res.status(400).json({
      status: 'fail',
      message,
    });
  }

  // Errores genéricos del servidor
  res.status(500).json({
    status: 'error',
    message: 'Algo salió muy mal!',
  });
};

export { AppError, NotFoundError, errorHandler };
