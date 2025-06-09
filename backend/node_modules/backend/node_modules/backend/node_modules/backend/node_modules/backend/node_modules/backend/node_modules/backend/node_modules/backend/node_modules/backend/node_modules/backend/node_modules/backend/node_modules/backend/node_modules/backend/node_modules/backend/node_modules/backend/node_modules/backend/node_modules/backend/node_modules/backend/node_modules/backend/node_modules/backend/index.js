/*const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require("./model/User")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://CanSysAdmin:%2ACan%23Sys%23Admin%2A@cluster0.wd8ca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Connection error:", err));
  

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    UserModel.findOne({email : email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.post("/register", (req, res) => {
    UserModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})


app.listen(3001, () => {
    console.log("server is running on port 3001")
})
    */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
require("dotenv").config();

const authRoute = require("./Routes/AuthRoute");
const cartRoute = require("./Routes/CartRoute");
const { MONGO_URL, PORT } = process.env;



mongoose.set('strictQuery', true);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));



app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

const payhereRoutes = require('./Routes/payhere');
app.use('/api/payhere', payhereRoutes);

app.use("/", authRoute);
app.use("/", cartRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});