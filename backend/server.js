const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();


// CORS
app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE"],
  allowedHeaders: ["Content-Type","Authorization"]
}));


app.use(express.json());



// Test route
app.get("/", (req,res)=>{
  res.send("API is running 🚀");
});



// Routes
app.use(
  "/api/auth",
  require("./routes/authRoutes")
);


app.use(
  "/api/tasks",
  require("./routes/taskRoutes")
);



// Render needs process.env.PORT
const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

 console.log(`Server running on port ${PORT}`);

});