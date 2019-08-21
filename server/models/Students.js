const mongoose = require('mongoose');
const { Schema } = mongoose;

const StudentsSchema = new Schema({
    _registration_number: Number,
    _first_name: String,
    _last_name: String,
    _classroom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Classrooms'
    },
    _gender: {
        type: String, 
        enum: ['Mr.', 'Mrs.', 'Ms.', 'Other']
    },
    _dateofbirth: Date,
    _registration_date: Date,
    _attendance: {
        _date: Date,
        _status: Boolean,
        _remark: String,
    },
    _first_parent: {
        _first_name: String,
        _last_name: String,
        _gender: {
            type: String, 
            enum: ['Mr.', 'Mrs.', 'Ms.', 'Other']
        },
        _adresse: String,
        _phone: String,
    },
    _second_parent: {
        _first_name: String,
        _last_name: String,
        _gender: {
            type: String, 
            enum: ['Mr.', 'Mrs.', 'Ms.', 'Other']
        },
        _adresse: String,
        _phone: String,
    },
    _guardian: {
        _first_name: String,
        _last_name: String,
        _gender: {
            type: String, 
            enum: ['Mr.', 'Mrs.', 'Ms.', 'Other']
        },
        _adresse: String,
        _phone: String,
    },
}, { timestamps: true });
StudentsSchema.methods.toJSON = function() {
    return {
        _id: this._id,

        _registration_number: this._registration_number,
        _first_name: this._first_name,
        _last_name: this._last_name,
        _classroom: this._classroom,
        _gender: this._gender,
        _dateofbirth: this._dateofbirth,
        _registration_date: this._registration_date,

        _attendance: this._attendance,
        _first_parent: this._first_parent,
        _second_parent: this._second_parent,
        _guardian: this._guardian,

        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};
mongoose.model('Students', StudentsSchema);