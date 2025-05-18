const User=require("../models/user.js");

module.exports.renderform=(req,res)=>{
    res.render("signup.ejs");
}

module.exports.signup=async(req,res)=>{
    try{
        let{username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeredUser=await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err);
            }
        })
        req.flash("success",`Welcome ${username} to Parijana`);
        res.redirect("/Parijana");
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.renderlogin=(req,res)=>{
    res.render("login.ejs");
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome to Parijana! You are Logged in!");
    let redirectUrl=res.locals.redirectUrl||"/Parijana";
    return res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        next(err);
    })
    req.flash("success","You are logged out now");
    res.redirect("/Parijana");
}