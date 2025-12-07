const mongoose = require('mongoose');



 const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: { type: String, default: 'user' },
})

export default mongoose.model('User', customerSchema);