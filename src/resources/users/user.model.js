import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import pick from 'lodash.pick'
import Joi from 'Joi'
import jwt from 'jsonwebtoken'
import config from './../../config/dev'

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
    // required: [true, 'Please enter your username'],
    trim: true
  },
  photoUrl: String,
  bio: String,
  url: String,
  isAdmin: Boolean
}

const userSchema = new mongoose.Schema(schema, { timestamps: true })

/* hash password before the save life cycle hook */
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } else {
    next()
  }
})

/* Choose user data to return to client */

userSchema.methods.toJSON = function() {
  let userObject = this.toObject()
  return pick(userObject, [
    '_id',
    'email',
    'username',
    'photoURL',
    'bio',
    'url'
  ])
}

/* User auth with JWT */
userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
      {_id: this._id, isAdmin: this.isAdmin},
      config.secrets.JWT_TOKEN
      )
    return token
}

export const User = mongoose.model('user', userSchema)

export function validateUser(data) {
  const schema = Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .label('Not a valid email'),
    password: Joi.string()
      .required()
      .min(6)
      .label('Password too short')
  })
  return Joi.validate(data, schema)
}
