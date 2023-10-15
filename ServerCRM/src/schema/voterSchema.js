const mongoose = require('mongoose');
const Coordinator = require('./coordinatorSchema');
const Colegio = require('./colegioSchema');
const Schema = mongoose.Schema;

const voterSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    phone: {type: String},
    identification: {type: String},
    colegio: {type: Schema.Types.ObjectId, ref: Colegio},
    coordinator: {type: Schema.Types.ObjectId, ref: Coordinator},
    voted: {type: Boolean, default: false}
},
{
    timestamps: true
}
);


module.exports = mongoose.model('Voter', voterSchema);

