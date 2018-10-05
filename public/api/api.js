function create() {
    // -------------------------------------
    console.log('Creating account for customer');

    var user = {
    name: document.getElementById("InputName1").value,
    email: document.getElementById("InputEmail1").value,
    balance: "0",
    password: document.getElementById("InputPassword1").value,
    transaction:"create"
    };

    var respond = document.getElementById('respond');

    // -------------------------------------  

    var url = '/account/create'+'/'+String(user.name)+'/'+String(user.email)+'/'+String(user.password);

    superagent
        .get(url)
        .end(function(err,res){
            if(err){ console.log(err);}
            else { console.log(res);
                   respond.innerHTML = JSON.stringify(res.text)
                }
        })
};

function login() {
    var temp_email = document.getElementById("InputEmail2").value;
    var temp_password = document.getElementById("InputPassword2").value;
    var url = '/account/login' + '/' + temp_email + '/' + temp_password;
    var respond = document.getElementById('respond');

    superagent
        .get(url)
        .end(function(err,res){
            if(err){ console.log(err);}
            else { console.log(res);
                   respond.innerHTML = JSON.stringify(res.text)
                }
    })

};

function deposit() {
    var temp_email = document.getElementById("InputEmail3").value;
    var temp_amount = document.getElementById("InputAmount3").value;
    var url = '/account/deposit' + '/' + temp_email + '/' + temp_amount;
    var respond = document.getElementById('respond');

    superagent
        .get(url)
        .end(function(err,res){
            if(err){ console.log(err);}
            else { console.log(res);
                   respond.innerHTML = JSON.stringify(res.text)
                }
    })

};

function withdraw() {
    var temp_email = document.getElementById("InputEmail4").value;
    var temp_amount = document.getElementById("InputAmount4").value;
    var url = '/account/withdraw' + '/' + temp_email + '/' + temp_amount;
    var respond = document.getElementById('respond');

    superagent
        .get(url)
        .end(function(err,res){
            if(err){ console.log(err);}
            else { console.log(res);
                   respond.innerHTML = JSON.stringify(res.text)
                }
    })

};

function transactions() {
    var temp_email = document.getElementById("InputEmail5").value;
    var url = '/account/transactions' + '/' + temp_email;
    var respond = document.getElementById('respond');
    
    superagent
        .get(url)
        .end(function(err,res){
            if(err){ console.log(err);}
            else { console.log(res);
                   respond.innerHTML = JSON.stringify(res.text)
                }
    })
    
};

function balance() {
    var temp_email = document.getElementById("InputEmail6").value;
    var url =  '/account/get' + '/' + temp_email;
    var respond = document.getElementById('respond');

    superagent
        .get(url)
        .end(function(err,res){
            if(err){ console.log(err);}
            else { console.log(res);
                   respond.innerHTML = JSON.stringify(res.text)
                }
    })
};