const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const captainScema = new mongoose.Schema({
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
        lowercase : true ,
        minlength : [5,'Email must atleast 5 Characters Long']
    },
    password :{
        type : String,
        required : true ,
        select : false,
    },
    socketId:{
        type : String ,
    },
    status :{
        type : String,
        enum : ['active','inactive'],
        default : 'inactive',
    },
    vehicle :{
        color: {
            type :String,
            required : true,
            minlength : [3,'Color must be at least 3 Characters long']
        },
        plate :{
            type : String,
            required :true,
            minlength :[3,'Plate must be at least 3 Characters long']
        },
        capacity :{
            type : Number,
            required :true,
            min :[1,"Capacity must be atleast 1"],
        },
        vehicleType :{
            type : String ,
            required : true ,
            enum : ['car','motorcycle','auto'],
        }
    },
    location :{
        lat :{
            type : Number,
        },
        lng :{
            type : Number,
        }
    }
})

captainScema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id :this._id},process.env.SECRET_KEY,{expiresIn:'24h'});
    return token
}

captainScema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}

captainScema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};



const captainModel = mongoose.model('captain',captainScema);
module.exports = captainModel;

