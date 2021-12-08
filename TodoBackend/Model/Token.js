const mongoose = require('mongoose');


var tokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true},
    token: { type: String, required: true },
    expireAt: { type: Date, default: Date.now, index: { expires: 10000 } }
});
const Token = mongoose.model('tokenSchema',tokenSchema,'tokenSchema');
module.exports = Token;
    