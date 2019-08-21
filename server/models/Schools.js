const mongoose = require('mongoose');
const { Schema } = mongoose;

const SchoolsSchema = new Schema({
    _name: String,
    _adresse: String,
    _prinipal_name: String,
}, { timestamps: true });
SchoolsSchema.methods.toJSON = function() {
    return {
        _id: this._id,

        _name: this._name,
        _adresse: this._adresse,
        _prinipal_name: this._prinipal_name,

        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};
mongoose.model('Schools', SchoolsSchema);