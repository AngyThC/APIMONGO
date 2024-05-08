const RegistroLogs = require('../../models/logs/RegistroLogs');
const axios = require('axios');

exports.crearRegistroLogs = async (req, res) => {
    try {
        const registro = new RegistroLogs({
            total_pagar: req.body.total_pagar,
            hora_salida: new Date(req.body.hora_salida1),
            correlativo: req.body.correlativo,
            JsonR: JSON.stringify(req.body)
        });
        await registro.save();

        // Envío de solicitud a la API de Node.js para actualizar el estado a 1 (verdadero)
        await axios.post('http://localhost:3000/actualizar_estado', {
            correlativo: req.body.correlativo,
            estadodos: 1 // Utiliza el nombre correcto del campo de estado
        });

        // Enviar respuesta con estado 201 si se guardó correctamente
        res.status(201).json(registro);
    } catch (error) {
        console.error("Error al guardar en MongoDB: ", error);

        try {
            // Envío de solicitud a la API de Node.js para actualizar el estado a 2 (infructuoso)
            await axios.post('http://localhost:3000/actualizar_estado', {
                correlativo: req.body.correlativo,
                estadodos: 2 // Utiliza el nombre correcto del campo de estado
            });
        } catch (axiosError) {
            console.error("Error al actualizar estado en la API de Node.js: ", axiosError);
        }

        // Enviar respuesta con estado 500 en caso de error
        res.status(500).json({ error: 'Error al registrar el pago de parqueo' });
    }
}
