import jwt from 'jsonwebtoken';

const adminMiddleware = {
  // Verificar si el token es de administrador
  verifyAdminToken: (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token de acceso requerido"
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'tu_secreto_jwt');
      
      // Verificar que sea un token de administrador
      if (decoded.type !== 'admin') {
        return res.status(403).json({
          success: false,
          message: "Token inválido para administrador"
        });
      }
      
      req.admin = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Token inválido"
      });
    }
  }
};

export default adminMiddleware; 