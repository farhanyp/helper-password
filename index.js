import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import nodemailer from "nodemailer";
const app = express();
const port = 3000;

// Set EJS sebagai view engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));


// Route untuk menampilkan halaman Hello World
app.get('/', (req, res) => {
  res.render('index', { message: 'Hello, World!' });
});

app.post("/password", async(req, res)=>{
    let {name, password, email, app} = req.body;
    const newPassword = `${password}-${name}-${password}-${app}-${email}`;
    const hashedInputPassword = await bcrypt.hash(newPassword, 10);
    console.log(hashedInputPassword);

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'farhan.yudha2016we@gmail.com',
            pass: 'glet kqgx tjmt bkzu'
        }
    })
    var mailOptions = {
        from: 'farhan.yudha2016we@gmail.com',
        to: email,
        subject: "Password Encrypted",
        text: `
        Nama: ${name}
        passowrd: ${hashedInputPassword}
        App: ${app}`
      };
    
      transport.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
});

// Mulai server pada port tertentu
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});