const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const machineSchema = mongoose.Schema({
    price:{
        type: Number,
        default : 0

    },
    schedule:{
        type: Array,
        default: [{"s":0,"reservation":0},{"s":1,"reservation":0},{"s":2,"reservation":0},{"s":3,"reservation":0},{"s":4,"reservation":0},{"s":5,"reservation":0},{"s":6,"reservation":0},{"s":7,"reservation":0},{"s":8,"reservation":0},{"s":9,"reservation":0},{"s":10,"reservation":0},{"s":11,"reservation":0},{"s":12,"reservation":0},{"s":13,"reservation":0},{"s":14,"reservation":0},{"s":15,"reservation":0},{"s":16,"reservation":0},{"s":17,"reservation":0},{"s":18,"reservation":0},{"s":19,"reservation":0},{"s":20,"reservation":0},{"s":21,"reservation":0},{"s":22,"reservation":0},{"s":23,"reservation":0},{"s":24,"reservation":0},
        {"s":25,"reservation":0},{"s":26,"reservation":0},{"s":27,"reservation":0},{"s":28,"reservation":0},
        {"s":29,"reservation":0},{"s":30,"reservation":0},{"s":31,"reservation":0},{"s":32,"reservation":0},
        {"s":33,"reservation":0},{"s":34,"reservation":0},{"s":35,"reservation":0},{"s":36,"reservation":0},
        {"s":37,"reservation":0},{"s":38,"reservation":0},{"s":39,"reservation":0},{"s":40,"reservation":0},
        {"s":41,"reservation":0},{"s":42,"reservation":0},{"s":43,"reservation":0},{"s":44,"reservation":0},
        {"s":45,"reservation":0},{"s":46,"reservation":0},{"s":47,"reservation":0}
        ]
    },
    laundry:{
        type: String
    },
    machinetype:{
        type: String,
        default: '세탁기'
    }
}, {timestamps: true})

const Machine = mongoose.model('Machine',machineSchema);

module.exports = {Machine};