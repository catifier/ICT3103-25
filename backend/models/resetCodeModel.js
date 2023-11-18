const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Account = require('./accountModel')

const resetCodeSchema = new Schema({
    account: { type: Schema.Types.ObjectId, ref: Account },
    email: { type: String, required: true },
    code: { type: String, required: true },
    attempts: { type: Number, required: true, default: 3 },
    createdAt: { type: Date, required: true, default: Date.now, expires: '5m' }
}, { versionKey: false })

module.exports = mongoose.model('ResetKey', resetCodeSchema)