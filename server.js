var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//var mongojs = require('mongojs');
//var db = mongojs('contactlist', ['Contact']);
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/contactlist');
mongoose.connect('mongodb://admin:xiecom@ds051640.mongolab.com:51640/flights',function(err) {
    if (err) {
        console.log('cant connect mongolab');
    }else {
        console.log('mongolab success');
    }
});

//mongoose.connection;
//var contactSchema = new mongoose.Schema({
//    name:String,
//    email:String,
//    phone:String
//});
//mongoose.model('contact', new mongoose.Schema({
//    name:String,
//    email:String,
//    phone:String
//}),'abc');
var Contact=mongoose.model('contact', new mongoose.Schema({
    name:String,
    email:String,
    phone:String
}),'contactlist');

mongoose.model('each', new mongoose.Schema({
    name:String,
    email:String
}),'contactlist');


//var contact = new Contact({name: "Webstorm",email:"webstorm@gmail.com",phone:"9055235111"});
//contact.save(function(err) {
//    if (err) {
//        console.log(err);
//    }else {
//        console.log("saved");
//    }
//})
//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
    //console.log("from node.js");
    //p1 = {
    //    name:'Tim',
    //    email:'time@gmail.com',
    //    number:'9059202821'
    //};
    //p2 = {
    //    name:'Emily',
    //    email:'emily@gmail.com',
    //    number:'9059202822'
    //};
    //p3 = {
    //    name:'John',
    //    email:'john@gmail.com',
    //    number:'9059202823'
    //};
    //var contactList = [p1, p2, p3];
    //res.json(contactList);
    //db.Contact.find(function(err,docs) {
    //    console.log(docs);
    //    res.json(docs);
    //});
    mongoose.model('contact').find(function(err,docs) {
        //console.log(docs);
        res.send(docs);
    })
});

app.post('/contactlist', function (req, res) {
    console.log(req.body);
    var contactInfo = req.body;
    var contact = new Contact({name: contactInfo.name,email:contactInfo.email,phone:contactInfo.phone});
    contact.save(function(err) {
        if (err) {
            console.log(err);
        }else {
            console.log("new record saved");
        }
    })
});

app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    mongoose.model('contact').findByIdAndRemove(id,function(err) {
        if (err) {
            console.log(err);
        }else {
            console.log(id+" removed");
        }
    })
});

app.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    mongoose.model('contact').findById(id,function(err,docs) {
        console.log(docs);
        res.send(docs);
    })
});

app.put('/contactlist/:id',function(req,res) {
    var id = req.params.id;
    mongoose.model('contact').findByIdAndUpdate(id,req.body,function(err,docs) {
        res.send(docs);
    })
    console.log(req.body);
});
//app.get('/contactlist/:userId', function (req, res) {
//    mongoose.model('each').find({_id: req.params.userId}, function (err, user) {
//        console.log(user);
//        res.send(user);
//    })
//});

app.get('/contactlist/:userName', function (req, res) {
    mongoose.model('each').find({name: req.params.userName}, function (err, user) {
        console.log(user);
        res.send(user);
    })
});

app.listen(3000);
console.log("server runnning port 3000");
