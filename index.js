const express=require("express");
const app=express();
var methodOverride = require('method-override')
app.use(methodOverride('_method'))
const { v4: uuidv4 } = require('uuid');
const port=3030;
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"ejs","views"));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true }));


let ar=[{
    id:uuidv4(),
    username:"sufiyan1",
    content:"loremepsoln1"
},
{
    id:uuidv4(),
    username:"sufiyan2",
    content:"loremepsoln2"
},
{
    id:uuidv4(),
    username:"sufiyan3",
    content:"loremepsoln3"
},


]
// home page  ALL POSTS
app.get("/",(req,res)=>{
    res.render("home.ejs",{ar});
})
app.get("/newpost",(req,res)=>{
   let id= uuidv4();
    res.render("newpost.ejs",{id});
})
app.post("/",(req,res)=>{
     let id = uuidv4();
    let newusername=req.body.username;
    console.log(newusername);
    let newcontent=req.body.content;
    ar.push({id,username:newusername,content:newcontent});
    res.redirect("/");
})
app.get("/post/:id",(req,res)=>{
    let{id}=req.params;
    let post=ar.find((p)=>p.id===id);
    res.render("showpost.ejs",{post});
})

app.patch("/post/:id",(req,res)=>{
    let{id}=req.params;
    let newcontent=req.body.content;
    let post=ar.find((p)=>p.id===id);
    post.content=newcontent;
    res.redirect("/");

})
app.get("/post/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=ar.find((p)=>p.id===id);
    res.render("edit.ejs",{post});
})
app.get("/post/:id/delete",(req,res)=>{
    let{id}=req.params;
    res.render("delete.ejs",{id});
})
app.delete("/post/:id",(req,res)=>{
    let {id}=req.params;
   ar=ar.filter((p)=>p.id!==id);
    res.redirect("/");
})
app.listen(port,()=>{
    console.log(`port is listening on ${port}`);
    
})