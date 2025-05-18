if(process.env.NODE_ENV!=="production"){
    require('dotenv').config(); 
}
const express=require("express");
const app=express();
const port=8080;
const path=require("path");
const ejsMate=require("ejs-mate");
const mongoose = require('mongoose');
const ExpressError = require("./utils/ExpressError");
const wrapAsync=require("./utils//wrapasync");
const methodOverride = require('method-override');
const session=require("express-session");
const flash = require('connect-flash');
const passport=require("passport");
const LocalStrategy=require("passport-local");

//routes
const chatbotRouter = require("./routes/chatbot");
const feedbackRouter = require("./routes/feedback");
const formFillingRouter = require("./routes/formFilling");
const contacts=require("./routes/contact");
const claimValidationRouter = require("./routes/claimvalidation");
const claimStatusRouter = require('./routes/claimStatusRouter');
const UserRoute = require("./routes/User");

const User=require("./models/user.js");


app.use(methodOverride('_method'));

app.engine("ejs",ejsMate);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());

const sessionoptions={
  secret: process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true,
  }
};

app.use(session(sessionoptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main()
.then(()=>{
    console.log("Database connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Parijana');
}

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

app.get("/Parijana",(req,res)=>{
    res.render("Parijana.ejs");
})
  
//contact
app.use("/Parijana/contact",contacts);

//chatbot
app.use("/Parijana/chatbot", chatbotRouter);

//feedback
app.use("/Parijana/feedback", feedbackRouter);

//automated form filling
app.use("/Parijana/formfilling", formFillingRouter);

//claim validation
app.use("/Parijana/claimvalidation", claimValidationRouter);

//claim status
app.use('/Parijana/claim-status', claimStatusRouter);

//Login-signup
app.use("/", UserRoute);




// app.all("*",(req,res,next)=>{
//     next(new ExpressError(404,"Page not Found"));
// });

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went wrong!"}=err;
    res.status(statusCode).render("error.ejs",{err});
});

app.listen(port,()=>{
    console.log(`The app is listening to port ${port}`);
})