require('dotenv').config();
const express = require('express')
const configViewEngine = require('./config/viewEngine');
const doAnRoutes = require('./routes/DoAnRouter');
const cookieParser = require("cookie-parser");
const session = require('express-session');

const app = express();
const port = process.env.PORT || 7777;
const hostname = process.env.HOST_NAME;

// config template engine
configViewEngine(app);

const oneDay = 1000 * 60 * 60 * 24;     // lưu phiên trong 1 ngày

app.use(session({
    secret: 'secret',  // Chuỗi bí mật để mã hóa phiên
    saveUninitialized:true,
    cookie: { maxAge: oneDay },     // đặt thời gian hết hạn của cookie
    resave: false 
}));
app.use(cookieParser());

// config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({extended: true}))   // for form data

// khai bao route
app.use('/', doAnRoutes);


// test connection


//simple query 



app.listen(port, hostname, () => {
    console.log(`ĐÃ CHẠY ...   >>>  http://localhost:${port}`)
})