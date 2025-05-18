const express=require("express");
const router=express.Router();
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
const Contact = require("../models/contact");
const {isLoggedIn}=require("../middleware");

router.get("/",isLoggedIn,(req,res)=>{
    res.render("contact.ejs");
})

router.post("/",isLoggedIn,async(req,res)=>{
    const {name,email,subject,message}=req.body;
    try{
        const contact=new Contact({name,email,subject,message});
        await contact.save();
        res.redirect("/Parijana"); 
    } catch(err){
        next(err);
    }
});

router.get("/adminlogin19",isLoggedIn,async(req,res)=>{
    let contacts=await Contact.find({});
    res.render("contactdetails.ejs",{contacts});
})

router.delete("/adminlogin19/:id",isLoggedIn,async (req, res) => {
    try{
      const {id}=req.params;
      await Contact.findByIdAndDelete(id);
      res.redirect("/Parijana/contact/adminlogin19"); 
    }catch (err){
      console.error(err);
      res.status(500).send("Something went wrong while deleting the contact.");
    }
});

module.exports = router;