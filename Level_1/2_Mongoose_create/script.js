/* Define package */
const mongoose = require("mongoose");

const userModel = require("./user");

/* connect database server */
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/level_1_learning');
    const userDetails = await userModel.create({
            name : "SivaKumar",
            age :  30,
            email : "sk@gmail.com",
            hobbies : ["coding" , "developing"],
            address : {
                street : "Chatram",
                city : "trichy"
            }
        });
    console.log(userDetails);
}

main().catch((err) => {
    console.log(err.message);
});


/* One method */
// const user = new userModel({
//     name : "SivaKumar",
//     age :  22
// });
// user.save().then(()=>{
//     console.log("User saved");
// });