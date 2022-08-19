const express=require("express");
const mongoose=require("mongoose");
const userModal=require("../Assignment_5/src/modal/userSchema");
const postModal=require("../Assignment_5/src/modal/postSchema");
const jwt=require("jsonwebtoken");
//need dotenv
require("dotenv").config()

//for hash generation for passsword we need salt and bycrypt
const bcrypt=require("bcrypt");
const salt=10;

//creating app
const app=express();
//creating server
app.listen(3000, ()=>{
    console.log("server started")
})
//connecting with database
mongoose.connect("mongodb://localhost/assignment_5" , ()=>{
    console.log("connected with the data base")
})
//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//routes

//first route is register for which we need password hash so use bcrypt and salt and then add user in database
app.post("/register", (req,res)=>{
    //generating salt
    bcrypt.genSalt(salt, (err,hashSalt)=>{
        bcrypt.hash(req.body.password, hashSalt, (err,passwordHash)=>{
            userModal.create({name:req.body.name, email:req.body.email, password:passwordHash}).then(()=>{
                res.status(200).send("user added successfully");
            }).catch((err)=>{
                res.status(400).send(err)
            })
        })
    })
})

//our second route is login for which we need bcrypt comparator to compare password has

app.post("/login", (req,res)=>{
    userModal.find({email:req.body.email}).then((user)=>{
        if(user.length){
            bcrypt.compare(req.body.password, user[0].password).then((match)=>{
                if(match){
                    //if both match then generate jwt
                    //for this we require secret key and payload
                    const authToken=jwt.sign(req.body.email, process.env.SECRET_KEY);
                    res.status(200).send(authToken)
                }else{
                    res.status(400).send("invalid Password")
                }
            })
        }else{
            res.status(400).send("invalid user")
        }
    })
})

//post route that need auth token to veryfiy user before post
app.post("/post", (req,res)=>{
    if(req.headers.authorization){
        try{
            const email=jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
            postModal.create({body: req.body.body, image: req.body.image, title: req.body.title, user:email}).then(()=>{
                res.status(200).send("Post added successffully");
            });
        }catch(err){
            res.status(400).send("You are not authorized to post here")
        }
    }else{
        res.status(400).send("you are missing authorization token")
    }
});
app.get("/post", (req,res)=>{
    postModal.find().then((user)=>{
        res.status(200).send(user);
    })
});

app.put("/post/:id", (req,res)=>{
    if(req.headers.authorization){
        postModal.find({_id: req.params.id}).then((post)=>{
            try{
                const email=jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
                if(post[0].user===email){
                    postModal.findByIdAndUpdate({_id: req.params.id},req.body).then(()=>{
                        res.status(200).send("Post updated successfully")
                    })
                }else{
                    res.status(400).send("your are not authorized to update the post")
                }
            }catch(err){
                res.status(403).send("You are not authorized");
            }
        })
    }else{
        res.status(400).send("where is you authorization token")
    }
})

app.delete("/post/:id", (req, res)=>{
    if(req.headers.authorization){
        postModal.find({_id: req.params.id}).then((post)=>{
            try{
                const email=jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
                if(post[0].user===email){
                    postModal.deleteOne({_id: req.params.id}).then(()=>{
                        res.status(200).send("Post deleted successfully")
                    })
                }else{
                    res.status(400).send("your are not authorized to delete the post")
                }
            }catch(err){
                res.status(403).send("You are not authorized")
            }
        })
    }else{
        res.status(400).send("where is you authorization token")
    }
})