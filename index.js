const express = require('express');
const path = require('path');
const port = '8000';

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app =express();


app.set('view engine', 'ejs');

app.set('views',path.join(__dirname, 'views') );
app.use(express.urlencoded());

app.use(express.static('assets'));

// middleware1
// app.use(function(req,res,next){
//     req.myName="rpan";
//     // console.log('middleware 1 called');
//     next();
// });
// //middleware 2
// app.use(function(req,res,next){
//     console.log('my name from mw2', req.myName);
//     // console.log("middleware 2 called");
//     next();
// });

var contactList = [
    {
        name: "arpan",
        phone: "54654845"
    }

    
]

app.get('/', function(req, res){
    
// console.log(req.myName);
    Contact.find({}, function(err, contacts){
        if(err){
            console.log('error in fecthing contacts from db');
            return;
        }

        return res.render('home', {
            title: "Contact list",
            contact_list: contacts
    
        });

    });
    
});

app.get('/practice', function(req,res){
    return res.render('practice', {
        title: "let us play with   EJS"
    });
});

app.post('/create-contact', function(req,res){
    
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
// contactList.push(req.body);

Contact.create({
    name: req.body.name,
    phone: req.body.phone
}, function(err, newContact){
    if(err){
        console.log('error in creating a contact');
        return;
        
    }
    console.log('**********', newContact);
    return res.redirect('back');

});
    // return res.redirect('/');
});

//for deleting a contact 
app.get('/delete-contact/', function(req,res){
    console.log(req.query);
    //get query from url
    //get the id from query in ul
    let id = req.query.id;
//find the contact in data using id and delete
    
    Contact.findByIdAndDelete(id, function(err){

        if(err){
            console.log('error in deleting the object from db');
            return;
        }
        return res.redirect('back');
    });
   

});

app.listen(port, function(err){

    if(err){
        console.log('error in running server');
    }

    console.log('yup my express server is running on port:', port);

});

// data directory of mongodb
// C:\Program Files\MongoDB\Server\4.2\data\ 