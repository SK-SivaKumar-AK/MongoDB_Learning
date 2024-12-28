/* Define package */
const mongoose = require("mongoose");


const addressSchema = new mongoose.Schema({
    street : String,
    city : String
});

/* define structure of document */
const userSchema = new mongoose.Schema({
    name : String,
    age : {
        type : Number,
        min : 1,
        max : 100,
        validate : {
            validator : (value) => {
                return value % 2 === 0;
            },
            message : (props) => {
                return `${props.value} is not a even number`;
            }
        }
    },
    email : {
        type : String,
        minLength : 10,
        require : true,
        lowercase:true   //uppercase : true
    },
    createdAt : {
        type : Date,
        immutable : true,        // not changed
        default : () => Date.now()
    },
    updatedAt : {
        type : Date,
        default : () => Date.now()
    },
    bestFriends : mongoose.SchemaTypes.ObjectId,
    hobbies : [String],
    address : addressSchema
});

/* create a model and with using the above structure */
//mongoose.model("User" , userSchema);



/* Export this module */
module.exports = mongoose.model("User" , userSchema);
