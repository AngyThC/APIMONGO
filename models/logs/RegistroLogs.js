const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');
const RegistroLogsSchema = mongoose.Schema({
    total_pagar: {
        type: Number,
        required: true
    },
    correlativo: {
        type:  String,
        required: true
    },
    hora_salida: {
        type:  Date,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now()
    },
    JsonR: {
        type: String, 
        required: true 
    }
});
RegistroLogsSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('RegistroLogs', RegistroLogsSchema);