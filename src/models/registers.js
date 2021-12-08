const mongoose= require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const userSchema = new mongoose.Schema({
fullname : {
	type:String,
	required:true
},
username : {
	type:String,
	required:true,
	unique:true
},
age : {
	type:Number,
	required:true
},
email: {
	type:String,
	required:true,
	unique:true
},
password: {
	type:String,
	required:true,
},
confirmpassword: {
	type:String,
	required:true,
}
})

//now we need to create collection

const Register = new mongoose.model("UserLogins",userSchema);
module.exports = Register;