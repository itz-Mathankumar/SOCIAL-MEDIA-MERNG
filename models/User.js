const { model, Schema } = require('mongoose')

const userSchema = new Schema({

        username:String,
        password: String,
        email: String,
        createdAt: String

    },{

    timestamps: true,

  }

)

module.exports = model('User',userSchema)