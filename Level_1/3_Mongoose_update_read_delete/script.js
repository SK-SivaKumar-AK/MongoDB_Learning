/* Define package */
const mongoose = require("mongoose");

const userModel = require("./user");

/* connect database server */
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/level_1_learning');

    /* mongoose query */
    //const userDetails = await userModel.where("name").equals("SivaKumar").where("age").equals(22).limit(2).select("age");   //select("age")  .populate("bestfriend")
    
    /* mongoDB query */
    const userDetails = await userModel.findOne( {_id : "676fd3bfe8d81899651c3d90"} );
    
    /* Update Query */
    //userDetails.bestFriends = "676fd3bfe8d81899651c3d90";
    
    /* custom function based on getting query */
    //userDetails.sayHi();
    
    /* custome query function straight*/
    //const userDetails = await userModel.findByName("SivaKumar");

    /* filter function .().()....*/
    //const userDetails = await userModel.find().byName("SivaKumar");
    
    //console.log(userDetails.namedEmail);
    // console.log(userDetails);
    // userDetails.save();
    console.log(userDetails);
}

main().catch((err) => {
    console.log(err.message);
});