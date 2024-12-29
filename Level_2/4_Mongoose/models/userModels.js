const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name : String,
//     age : Number,
//     email : String,
//     createdAt : Date,
//     updatedAt : Date,
//     bestFriend : mongoose.SchemaType.ObjectId,
//     hobbies : [String],
//     address : {
//         city : String,
//         street : String
//     }
// });

//              OR

// const addressSchema = new mongoose.Schema({
//     city : String,
//     street : String
// });

// const userSchema = new mongoose.Schema({
//     name : String,
//     age : Number,
//     email : String,
//     createdAt : Date,
//     updatedAt : Date,
//     bestFriend : mongoose.SchemaType.ObjectId,
//     hobbies : [String],
//     address : addressSchema
// });

//              OR

const addressSchema = new mongoose.Schema({
    city : String,
    street : String
});

const userSchema = new mongoose.Schema({
    name : String,
    age : {
        type: Number,
        min : 10,
        max : 50,
        validate : {
            validator : (v)=>{
                return v % 2 === 0;
            },
            message : (props)=>{
                `${props.value} is not even number.`
            }
        }
    },
    email : {
        type : String,
        require : true,
        lowercase : true    // uppercase
    },
    createdAt : {
        type : Date,
        default : ()=>{
            return Date.now();
        }
    },
    updatedAt : Date, 
    bestFriend : {
        type : mongoose.SchemaType.ObjectId,
        ref : 'Users'    // another doc name
    },
    hobbies : [String],
    address : addressSchema
});

userSchema.methods.sayHi = function(){
    console.log(`${this.name}`);
}

userSchema.statics.findbyName = function(name){
    return this.find( {name : name} );
}

userSchema.query.findName = function(name){
    return this.where( {name : name} );
}

userSchema.virtual('namedEmail').get(function(){
    retuen `${this.name} ${this.email}`;
});

userSchema.pre('save' , function(next){
    this.name = `Mr. ${this.name}`;
    next();
});

userSchema.post('save' , function(doc , next){
    doc.name = `${doc.name} Modified`;
    next();
})


const userModel = mongoose.model('User' , userSchema);

module.exports = userModel;