// require the library

const mongoose = require("mongoose");


// connect to the database
mongoose.connect(process.env.db || "mongodb://localhost/todo_list_db");

// aquiring the connection
const db = mongoose.connection;

db.on('error',console.error.bind(console,"error connecting to the database"));


db.once('open',function(){
  console.log("Connected to the database Successfully");
});
