const express = require("express");
const port = process.env.PORT || 3000;
const db = require("./config/mongoose");
const app = express();
const path = require("path");

const contact_schema = require("./Models/contact");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded()); //Middle Ware
app.use(express.static("assest"));

var items = [
  {
    name: "Chandan Kumar",
    phone: "8984703151",
  },
  {
    name: "Prince",
    phone: "9638521470",
  },
  {
    name: "Rohit",
    phone: "6371276091",
  },
];

app.get("/", function (req, res) {
  contact_schema.find({}, function (err, contacts) {
    if (err) {
      console.log("Error arises when printing the data from the database!");
      return;
    }

    return res.render("contact_list", {
      title: "Contact List !!",
      contact_items: contacts,
    });
  });
});

// Accepting Records from From
app.post("/contact_path", function (req, res) {
  // items.push({
  //   name:req.body.my_name,
  //   phone:req.body.my_phone
  // })
  // ------------OR----------
  // items.push(req.body); here keyname should be same

  // connecting the data base

  contact_schema.create(
    {
      name: req.body.my_name,
      phone: req.body.my_phone,
    },
    function (err, contact_data) {
      if (err) {
        console.log("Error in creating the database !");
        return;
      }
      return res.redirect("/");
    }
  );

  // return res.redirect("/");//Need to give page location
});

//For deleting the data from the contact
app.get("/delete-contact", function (req, res) {
  let p = req.query.id;

  contact_schema.findByIdAndDelete(p, function (err) {
    if (err) {
      console.log("error occured while deleting the document from the db");
      return;
    }
    return res.redirect("back");
  });

  // let contactIndex = items.findIndex(contact =>contact.phone == p);

  // if (contactIndex != -1){
  //   items.splice(contactIndex,1);
  // }
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Server is running on port: ${port}`);
});
