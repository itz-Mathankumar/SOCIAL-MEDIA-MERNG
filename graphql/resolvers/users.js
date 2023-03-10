const User = require('../../models/User')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const { UserInputError } = require('apollo-server')

const { validateRegisterInput } = require('../../utils/validators')

module.exports = {

    Mutation: {

        async register(
            
            _,
            
            {

                registerInput: { username, email, password, confirmPassword }

            },
            
            ){

                const { valid, errors} =validateRegisterInput(username, email, password, confirmPassword)

                if(!valid){

                    throw new UserInputError('Errors', { errors } )
                    
                }
                const user = await User.findOne({ username })

                if(user){

                    throw new UserInputError('Username is take',{

                        errors:{

                            username: 'This username is taken'

                        }

                    })
                }

                password = await bcrypt.hash(password, 12)

                const newUser = new User(
                    {

                        email,
                        username,
                        password,
                        createdAt: new Date().toISOString()

                    }
                )

                const res = await newUser.save()

                const token = jwt.sign({

                    id: res.id,
                    email: res.email,
                    username: res.username

                },process.env.SECRET, { expiresIn: '1h'}

                )

                return{

                    ...res._doc,
                    id: res._id,
                    token

                }
        }

    }
}