// add http server
// -----------------------
var express = require('express');
var app     = express();
var low     = require('lowdb');
var fs      = require('lowdb/adapters/FileSync');
var adapter = new fs('db.json');
var db      = low(adapter);
var superagent = require('superagent');

// configure express to serve static files from public directory
// ------------------------------------------------------------------
app.use(express.static('public'));

// init the data store
db.defaults({ accounts: [{name:'',email:'',balance:'',password:'', transactions:''}] }).write();

// account create
app.get('/account/create/:name/:email/:password', function(req, res){

    var existing_account = db.get('accounts').find({email:req.params.email}).value();

    if(existing_account != null){
        console.log('This account already exists!');
        res.send('This account already exists!');
        return;
    }
    else{
        var new_account = {
        "name" : req.params.name,
        "email" : req.params.email,
        "password" : req.params.password,
        "balance":0,
        "transactions":'Account created, '
    };
        db.get('accounts').push(new_account).write();
        console.log(new_account.name + '\'s account has been created');
        res.send('Congratulations '+ new_account.name +', your account has been created');
    }

});

// login in
app.get('/account/login/:email/:password', function (req, res) {

	var current_account = db.get('accounts').find({email:req.params.email}).value();
    var current_password = req.params.password;

    if(current_account == null) {
        console.log('This account has not been created!');
        res.send('This account has not been created!');
    }
    else if(current_account != null && current_account.password != current_password) {
        console.log('This password is incorrect');
        res.send('This password is incorrect');
    }
    else{
	    console.log('Welcome back ' + current_account.name);
        res.send('Welcome back ' + current_account.name);
    };
    
});

// deposit
app.get('/account/deposit/:email/:amount', function (req, res) {

	var current_account = db.get('accounts').find({email:req.params.email}).value();

    if(current_account == null) {
        console.log('This account does not exist!');
        res.send('This account does not exist!');
    }
    else{
 		new_balance = current_account.balance + Number(req.params.amount);
		new_transactions = current_account.transactions + (' Deposit ' + req.params.amount + ', ');
		db.get('accounts')
		.find({ email: req.params.email })
		.assign({ balance: new_balance , transactions:new_transactions})
		.write()
	console.log('New amount deposited for ' + current_account.name);
    res.send('New amount deposited for ' + current_account.name);
    };
    
});

// withdraw
app.get('/account/withdraw/:email/:amount', function (req, res) {

    var current_account = db.get('accounts').find({email:req.params.email}).value();

    if(current_account == null) {
        console.log('This account does not exist!');
        res.send('This account does not exist!');
    }
    else{
    	new_balance = current_account.balance - Number(req.params.amount);
    	new_transactions = current_account.transactions + (' Withdraw ' + req.params.amount + ', ');
    	db.get('accounts')
    	.find({ email: req.params.email })
    	.assign({ balance: new_balance, transactions:new_transactions })
    	.write()
    console.log('New amount withdrawed for ' + current_account.name);
    res.send('New amount withdrawed for ' + current_account.name);
    };
    
});

// transactions
app.get('/account/transactions/:email', function (req, res) {

    var current_account = db.get('accounts').find({email:req.params.email}).value();

    if(current_account == null) {
        console.log('This account does not exist!');
        res.send('This account does not exist!');
    }
    else{ 
    console.log('Hello '+ current_account.name +', please see your transaction history: ' + current_account.transactions);
    res.send('Hello '+ current_account.name +', please see your transaction history: ' + current_account.transactions);
    };

});

// balance
app.get('/account/get/:email', function (req, res) {

    var current_account = db.get('accounts').find({email:req.params.email}).value(); 

    if(current_account == null) {
        console.log('This account does not exist!');
        res.send('This account does not exist!');
    }
    else{ 
    console.log('Hello '+ current_account.name +', your balance is: ' + current_account.balance);
    res.send('Hello '+ current_account.name +', your balance is: ' + current_account.balance);
    };
    
});

// start server
app.listen(3000,function(){

	console.log('Running on port:3000')

});
