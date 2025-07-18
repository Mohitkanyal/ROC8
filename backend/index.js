// // const express = require("express")
// // const cors = require("cors")
// // require('dotenv').config();
// // const cookieParser = require('cookie-parser')
// // const connectDB = require("../backend/config/db");
// // const router = require('./routes/index');

// // const app = express()
// // app.use(cors({
// //     origin: process.env.FRONTEND_URL,
// //     credentials: true
// // }));
// // app.use(express.json());
// // app.use(cookieParser());

// // app.use("/api",router);

// // const PORT = 8080 || process.env.PORT

// // connectDB().then(() => {
// //     app.listen(PORT,() => {
// //         console.log("Connect to db");
// //         console.log("Server is running");
// //     })
// // })
// const express = require("express")
// const cors = require("cors")
// require('dotenv').config();
// const cookieParser = require('cookie-parser')
// const connectDB = require("../backend/config/db");
// const router = require('./routes/index');

// const app = express()
// app.use(cors({
//     origin: process.env.FRONTEND_URL,
//     credentials: true
// }));
// app.use(express.json());
// app.use(cookieParser());

// app.use("/api",router);

// const PORT = 8080 || process.env.PORT

// connectDB().then(() => {
//     app.listen(PORT,() => {
//         console.log("Connect to db");
//         console.log("Server is running");
//     })
// })

const express = require("express")
const cors = require("cors")
require('dotenv').config();
const cookieParser = require('cookie-parser')
const connectDB = require("../backend/config/db");
const router = require('./routes/index');

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json({ limit: '50mb' })); 

app.use(express.urlencoded({ limit: '50mb', extended: true })); 

app.use(cookieParser());
app.use("/api",router);

const PORT = process.env.PORT || 8080; 

connectDB().then(() => {
  app.listen(PORT,() => {
    console.log("Connect to db");
    console.log(`Server is running on port ${PORT}`);
  })
}).catch(err => {
    console.error("Database connection failed:", err);
    process.exit(1); 
});