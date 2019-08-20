const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubjectsSchema = new Schema({
    _name: String,
    _courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
}, { timestamps: true });
SubjectsSchema.methods.toJSON = function() {
    return {
        _id: this._id,

        _name: this._name,
        _courses: this._courses,

        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
    };
};
mongoose.model('Subjects', SubjectsSchema);