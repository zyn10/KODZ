const express = require("express");
const path = require("path");
const app =express();
const hbs = require("hbs");

require("./db/conn");
const Register = require("./models/registers");
const async = require("hbs/lib/async");
const exp = require("constants");

const port = process.env.PORT || 5000;

const static_path = path.join(__dirname,"../public");
const template_path = path.join(__dirname,"../templates/views" );
const partials_path = path.join(__dirname,"../templates/partials" );

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
//app.set("view engine","html");
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
app.get("/index", (req, res) => {
	res.render("index");
})
app.get("/about", (req, res) => {
	res.render("about");
})
app.get("/after-enroll", (req, res) => {
	res.render("after-enroll");
})
app.get("/blog-details-left-sidebar", (req, res) => {
	res.render("blog-details-left-sidebar");
})
app.get("/blog-details-right-sidebar", (req, res) => {
	res.render("blog-details-right-sidebar");
})
app.get("/blog-grid", (req, res) => {
	res.render("blog-grid");
})
app.get("/blog-left-sidebar", (req, res) => {
	res.render("blog-left-sidebar");
})
app.get("/blog-right-sidebar", (req, res) => {
	res.render("blog-right-sidebar");
})
app.get("/blog-left-sidebar", (req, res) => {
	res.render("blog-left-sidebar");
})
app.get("/contact", (req, res) => {
	res.render("contact");
})
app.get("/courses-admin", (req, res) => {
	res.render("courses-admin");
})
app.get("/courses-admin", (req, res) => {
	res.render("courses-admin");
})
app.get("/courses-details", (req, res) => {
	res.render("courses-details");
})
app.get("/courses", (req, res) => {
	res.render("courses");
})
app.get("/students", (req, res) => {
	res.render("students");
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
		
	}else{
		res.send("Password not matching")
	}

	}
	catch(error){
		res.status(400).send(error);
	}
})



//app login
app.post("/login", async(req,res)=>{
	try {
		const email = req.body.email;
		const password = req.body.password;
		
		const useremail = await Register.findOne({email:email});
		
		if(useremail.password===password)
		{
			res.status(201).render("index");
			//res.redirect("../templates/views/index.html");
			//window.open("../templates/views/index.html");
		}
		else{
			//window.open("../templates/views/index.html");
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