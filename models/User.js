const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
    {
        name: {
            first: {type: String, required: [true, 'first name is required']}, 
            last: {type: String, required: [true, 'last name is required']} 
        },
        email: { type: String, required: [true, 'email is required'], unique: true },
        password: { type: String, required: [true, 'password is required'] },
        profilePicture: { type: String }
    },
    { timestamps: true }
);

userSchema.pre(['save'], async function (next) {
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (e) {
        throw Error('could not hash password');
    }
})


module.exports = mongoose.model("User", userSchema);
