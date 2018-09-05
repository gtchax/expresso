import mongoose from 'mongoose'

const schema = {
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: 8,
        trim: true
    },
    username: {
        type: String,
        required: [true, 'Please enter your username'],
        trim: true
    }
}

const userSchema = new mongoose.Schema(schema, { timestamps: true})

/*
* Choose user data to return to client
* */

userSchema.methods.toJSON = function() {
    let userObject = this.toObject()
    return pick(userObject, ['_id', 'email', 'username', 'photoURL', 'bio', 'url'])
}

export const User = mongoose.model('user', userSchema)