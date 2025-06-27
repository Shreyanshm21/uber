const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type : String ,
            required : true ,
            minlength :[3,'First name must be atleast 3 Characters Long'],
        },
        lastname:{
            type : String ,
            minlength :[3,'Last name must be atleast 3 Characters Long'],
        }
    },
    email:{
        type:String,
        required : true ,
        unique : true ,
        minlength : [5,'Email must atleast 5 Characters Long']
    },
    password :{
        type : String,
        required : true ,
        // if you try to find the user and if the data is sending then password will not be sent .
        select : false,
    },
    socketId:{
        type : String ,
    },
})


//Creating Some Methods on User Schema 

//creating jwt token 
userSchema.methods.generateAuthToken = async function(){
    const token = await jwt.sign({_id : this._id} , process.env.SECRET_KEY);
    return token ;
}

//comparing the password 
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

//Hashing the Password 
/*
Why hashPassword Should Be Static?
👉 It doesn’t need access to a specific user document.
Hashing a password is an independent operation; it just takes a string and returns a hashed value.
There's no need to call it on a specific user instance.

*/
userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};


const userModel = mongoose.model('user',userSchema);

module.exports = userModel;




