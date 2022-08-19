const express=require("express");
const ejs=require("ejs");
const mongoose=require("mongoose");
const userModal=require("../Assignment_4/src/modal/userModal.js");
const methodOverride=require("method-override"); //to use put and delete in form  //it has only post and get //it will overide post and get

const app=express();

//setting view engine

app.set("view engine", "ejs");

//creating server
app.listen(3000, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("server created successfully")
    }
})

//connenctiong with our data base

mongoose.connect("mongodb://127.0.0.1:27017/assignment4").then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err)
})

//we want to take data from boyd so use body parser middle ware
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//method overriding middleware
app.use(methodOverride("_method"));

//creating class through function and send through ejs in base route
const getClass=(isPromoted)=>{
    //if null then clss secodryu false-danger true-primary
    let className="secondary"; //initially null so class is secondary
    if(isPromoted){    //if ispromoted is true
        className="primary" 
    }else if(isPromoted !=null){ //if false and not null    
        className="danger"
    }
    return className;
}



//creating routes for form

app.get("/", (req, res)=>{
    userModal.find().then((user)=>{
        res.render("user" , {user, getClass})
    }).catch((err)=>{
        console.log(err)
    })
    
})


app.get("/form", (req,res)=>{
    res.render("user_form.ejs");
})

//creating routes for user data add to database and also checking duplicacy
//saving user data into database

app.post("/user/add",(req, res)=>{
    userModal.find({email:req.body.email}).then((userData)=>{  //checking two must not be same for two user
        if(userData.length){
            res.status(400).send("user Exist");
        }else{
            userModal.create({name:req.body.name, email:req.body.email, isPromoted:null}).then(()=>{
                res.redirect("/")
            }).catch((err)=>{
                console.log(err)
            })
        }
    })
});

//adding put and delete method
app.put("/user/update/:id", (req, res)=> {
    userModal.find({email: req.params.id}).then((userData)=> {
        userModal.updateOne({email: req.params.id}, {isPromoted: !userData[0].isPromoted}).then(()=> {
            res.redirect("/");
        }).catch((err)=> {
            res.status(400).send(err)
        })
    })
    
});

app.delete("/user/delete/:id", (req, res)=> {
    userModal.deleteOne({email: req.params.id}).then(()=> {
        res.redirect("/");
    })
})




