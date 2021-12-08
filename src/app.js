const express = require("express");
const path = require("path");
const app =express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");
const async = require("hbs/lib/async");
const exp = require("constants");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views" );
const partials_path = path.join(__dirname,"../templates/partials" );

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);


app.get("/",(req,res)=>{
res.render("login")
})

app.get("/register", (req, res) => {
	res.render("register");
})

app.get("/login", (req, res) => {
	res.render("login");
})

//create a new user in our database
app.post("/register", async(req, res) => {
	try
	{
	const password =req.body.password;
	const cpassword =req.body.confirmpassword;

	if(password === cpassword)
	{
		const registerUSER = new Register({
			fullname : req.body.fullname,
			username : req.body.username,
			age      : req.body.age,
			email 	 : req.body.email,
			password : req.body.password,
			confirmpassword:req.body.confirmpassword
		})

		const registered= await registerUSER.save();
		res.status(201).render("login");
		//req.flash("User Added Successfully");
		//req.redirect("/templates/views/login");
		
	}else{
		res.send("Password not matching")
	}

	}
	catch(error){
		res.status(400).send(error);
	}
})
//backup if engine not work
//app.get("/",(req,res)=>{
//	res.send("Welcome to Coding World");
//});



//app login
app.post("/login", async(req,res)=>{
	try {
		const email = req.body.email;
		const password = req.body.password;
		
		const useremail = await Register.findOne({email:email});
		
		if(useremail.password===password)
		{
			res.status(201).render("register");
		}
		else{
			res.send("Incorrect Credentials");
		}
		//res.send(useremail);
		//console.log(useremail);
		//console.log(`${email} and password is ${password}`);
	} catch (error) {
		res.status(400).send("invalid Credentials");
	}
})

app.listen(port,()=>{
	console.log (`Server is listening at port no ${port}`);
})