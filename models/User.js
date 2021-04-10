const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
          ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
        },
        {
            toJSON: {
              virtuals: true,
              getters: true,
            },
            id: false,
          }
        );

//retrives the length of the user's friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.lenght;
});

// create the user model using userSchema
const User = model("User", userSchema);

// export the model
module.exports = User;