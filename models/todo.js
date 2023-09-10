const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//making app schema and model
const todoSchema = new Schema({
    name: {
        type: String,
        required: 'Name must not be blank'
    }, 
    completed :{
        type: Boolean, 
        default: false
    },
    created_date:{
        type: Date,
        default: Date.now()
    }

})

module.exports= mongoose.model('Todo', todoSchema)