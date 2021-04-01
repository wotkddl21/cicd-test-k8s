const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const laundrySchema = mongoose.Schema({
    name:{
        type: String,
        maxlength: 50
    },
    price:{
        type: Number,
        default : 0

    },
    machineNum:{
        type:Number,
        default:0
    },
    phone:{
        type: String
    },
    address:{
        type: String
    },
    images:{
        type: Array,
        default: []
    }
}, {timestamps: true})

const Laundry = mongoose.model('Laundry',laundrySchema);

module.exports = {Laundry};