const { model, Schema } = require('mongoose');
const AccountSchema = new Schema(
    {
        username: { type: String, required: true },
        funds: { type: Number, default: 0 },
    }
);

module.exports = model('Account', AccountSchema);
