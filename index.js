const express = require("express");
const app = express();
const path = require("path");

app.set('view engine',"ejs");


var items = [{
  "name" : "Chandan Kumar",
  "phone": "8984703151"
}];

app.get("/",function (req,res){
  return res.render("contact_list",{
    title:"Contact List !",
    contact_items : items
  });
});

app.listen(8000);
