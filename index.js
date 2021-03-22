const express = require("express");
const app = express();
const path = require("path");

app.set('view engine',"ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded());//Parser 
app.use(express.static("assest"));


var items = [{
  "name" : "Chandan Kumar",
  "phone": "8984703151"
  },{
    name:"Prince",
    phone:"9638521470"
  },
  {
    name:"Rohit",
    phone:"6371276091"
  }

];

app.get("/",function (req,res){
  return res.render("contact_list",{
    title:"Contact List !!",
    contact_items : items
  });
});

// Accepting Records from From 
app.post("/contact_path",function(req,res){

  items.push({
    name:req.body.my_name,
    phone:req.body.my_phone
  })
  // ------------OR----------
  // items.push(req.body); here keyname should be same

  return res.redirect("/");//Need to give page location
})


app.listen(8000);
