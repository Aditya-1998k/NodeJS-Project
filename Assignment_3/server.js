const express=require("express");  //importing express
const ejs=require("ejs");   //importing ej

const app=express();  //express object in app so that we can use it easily

//creating user array to store the data
const user=[];

//setting our view engine 
app.set("view engine", "ejs");

//using body parser
app.use(express.json()); //reading json data
app.use(express.urlencoded({extended:false}));

//server created
app.listen(3000, (err, res)=>{
    console.log("server running successfully")
})

//template engine route
app.get("/", (req,res)=>{
   res.render("dumy_user.ejs", {user})
});

app.get("/form", (req, res)=>{
    res.render("form.ejs")  //giving data to dumy user by passing as object here user is array passing to form ejs
})

app.post("/user/add", (req, res)=>{   //form have action /user/add which render data into it
    user.push(req.body);
    //console.log(req.body)
    res.redirect("/");
});


