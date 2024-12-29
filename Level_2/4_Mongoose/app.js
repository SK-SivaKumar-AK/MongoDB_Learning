const mongoose = require('mongoose');

const users = require('./models/userModels');

mongoose.connect('mongodb://127.0.0.1:27017/advance').then(()=>{
    console.log('Connected');
}).catch((err)=>{
    console.log(err.message);
});



// const user = new users({
//     name : 'Logesh',
//     age : 28
// });

// user.save().then(()=>{
//     console.log('User Saved');
// });

//            OR

// async function insert(){
//     const newUser = await user.save();
//     console.log(newUser);
// }
// insert();

//             OR

async function insert(){
    const newUser = await user.create({
        name : 'Logesh',
        age : 28
    });
    console.log(newUser);
}
insert();

//              Query getting data

async function insert(){
    const newUser1 = await users.findById('xxxxxxxxxxx');
    const newUser2 = await users.find( { name : 'sk' } );
    const newUser3 = await users.findOne( { } );
    const newUser4 = await users.exists( { name : 'sk' } );
    const newUser5 = await users.where('name').equals('sk');
    const newUser6 = await users.where('age').gt('10');
    const newUser7 = await users.where('age').lt('10');
    const newUser8 = await users.where('age').gt('10').populate('<another link column>').limit(1);
    const newUser9 = await users.where('age').gt('10');

    //customize create function or methods
    const newUser10 = await users.findOne( { } );
    newUser10.sayHi();

    //customize create get data function
    const newUser11 = await users.findbyName('sk');

    //customize create query chain
    const newUser12 = await users.find().findName('sk');

    //custome methods
    console.log(newUser10.namedEmail);


    //pre and post middle ware
    await user1.save();

    
    console.log(newUser);
}
insert();