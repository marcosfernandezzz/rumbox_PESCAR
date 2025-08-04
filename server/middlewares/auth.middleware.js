import jwt from 'jsonwebtoken';

const authMiddleware = {
  // Verificar si el usuario está autenticado
  verifyToken: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token de acceso requerido"
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token inválido"
      });
    }
  },

  // Verificar si el usuario es administrador
  verifyAdmin: (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado. Se requieren permisos de administrador"
      });
    }
    next();
  }
};

export default authMiddleware; 