import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ mensaje: 'No se proporcionó un token' });
    }

    jwt.verify(token, 'perro', (err, user) => {
        if (err) {
            return res.status(403).json({ mensaje: 'Token no válido' });
        }

        // Almacenar la información del usuario en el objeto de solicitud
        req.user = user;
        next(); // Continuar con la siguiente middleware o ruta
    });
};

export default authMiddleware;