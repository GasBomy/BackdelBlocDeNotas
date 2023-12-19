import jwt from 'jsonwebtoken';

const RutasProtegidas = async (req, res) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return res.status(403).json({ mensaje: 'No autorizado' });
        }

        jwt.verify(token, 'perro', (err, user) => {
            if (err) {
                return res.status(403).json({ mensaje: 'No autorizado' });
            } else {
                console.log('Subiendo los datos');
                res.status(200).json({ mensaje: 'Autorizacion exitosa', user });
            }
        });
    } catch (error) {
        console.error('Error en la verificación del token:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};

export default RutasProtegidas;