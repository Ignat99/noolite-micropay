/* Loading ripple-lib with Node.js */
var Remote = require('ripple-lib').Remote;
var Amount = require('ripple-lib').Amount;
var remote1 = require('./remote.js');
var remote2 = require('./remote.js');

/*
// Create new acc:

var NewAcc = Ripple.Wallet.generate();
var NewAddress = NewAcc['address'];
var NewSecret = NewAcc['secret'];

// New devices

var NEW_DEVICES_ADDRESS = NewAddress;
var NEW_DEVICES_SECRET  = NewSecret;
*/

// Info about 3 acc (fund, devices, developer)

var BANK_ADDRESS = 'rD2F8d4697BNjBNqgtB4D3oaFfTEYWqDVk';

var FUND_ADDRESS = 'rLaTKSx5Zqcvjrchdeqd2tkSyTVm7jeJmK';
var FUND_SECRET  = 's';

var DEVICES_ADDRESS = 'rBuovjh9xJLAed3jhh4xPbWFapa3DfYZNp';
var DEVICES_SECRET  = 's';

var DEVELOPER_ADDRESS = 'r9AzqzAATgPxjEUvCxSBowjyFzG8cFzSAd';
var DEVELOPER_SECRET  = 's';

var RECIPIENT  = DEVICES_ADDRESS; //Devices

var AMOUNT     = Amount.from_human('0.1XRP');
var AMOUNT_DEV     = Amount.from_human('0.01XRP');


// Trust line for devices
/*
remote.connect(function() {
  console.log('Connected to the Ripple network at s1.ripple.com');
  remote.set_secret(MY_ADDRESS, MY_SECRET);
  
  var transaction = remote.transaction();

  transaction.ripplelineSet({
    limit: '1000000/RAM/'+BANK_ADDRESS, 
    from: FUND_ADDRESS
  });

  transaction.submit(function(err, payment) {
    console.log(err, payment);
  });

  // see the API Reference for available functions
});

// Trust line for developer acc

remote.connect(function() {
  console.log('Connected to the Ripple network at s1.ripple.com');
  remote.set_secret(MY_ADDRESS, MY_SECRET);
  
  var transaction = remote.transaction();

  transaction.ripplelineSet({
    limit: '1000000/RAM/'+BANK_ADDRESS, 
    from: DEVELOPER_ADDRESS
  });

  transaction.submit(function(err, payment) {
    console.log(err, payment);
  });

  // see the API Reference for available functions
});
*/

// recive from rx1164

function pay(){

var spawn = require('child_process').spawn,
    ls    = spawn('nooliterx', []);

ls.stdout.on('data', function (data) {
  data= data.toString('utf-8').trim();
  if (data == '4' ) {
  	console.log('on/off');
  }
  if (data == '5' ) {
  	console.log('change brightness to reverse direction');
  }
  if (data == '10' ) {
  	console.log('stop adjustment');
  }

// Pay from fund to devices 0.1 XRP

remote1.connect(function() {
  console.log('Connected to the Ripple network from Fund at s1.ripple.com');
  remote1.set_secret(FUND_ADDRESS, FUND_SECRET);
  
  var transaction = remote1.transaction();

  transaction.payment({
    from: FUND_ADDRESS, 
    to: DEVICES_ADDRESS, 
    amount: AMOUNT
  });

  transaction.submit(function(err, payment) {
    console.log(err, payment);
  });


  // see the API Reference for available functions
});

// Pay from devices to developer 0.01 XRP

remote2.connect(function() {
  console.log('Connected to the Ripple network from DEVICES at s1.ripple.com');
  remote2.set_secret(DEVICES_ADDRESS, DEVICES_SECRET);
  
  var transaction = remote2.transaction();

  transaction.payment({
    from: DEVICES_ADDRESS, 
    to: DEVELOPER_ADDRESS, 
    amount: AMOUNT_DEV
  });

  transaction.submit(function(err, payment) {
    console.log(err, payment);
  });


  // see the API Reference for available functions
});




});


ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('close', function (code) {
//  console.log(code);
   pay()
});


}

pay()



// Function for statistics of the account

//FUND_ADDRESS
//https://ripple.com/graph/#rLaTKSx5Zqcvjrchdeqd2tkSyTVm7jeJmK

//DEVICES_ADDRESS
//https://ripple.com/graph/#rBuovjh9xJLAed3jhh4xPbWFapa3DfYZNp

//DEVELOPER_ADDRESS
//https://ripple.com/graph/#r9AzqzAATgPxjEUvCxSBowjyFzG8cFzSAd


// Put statistics information to site http://bitpay-yeomen-express-basic.herokuapp.com/




