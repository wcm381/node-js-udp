
// code from http://lowtechhightech.wordpress.com/2014/03/04/arduino-ethernet-shield-node-js-and-aws-opsworks/

var dgram = require("dgram");
var server = dgram.createSocket("udp4");
var fs = require('fs');
 
var crlf = new Buffer(2);
crlf[0] = 0xD; //CR - Carriage return character
crlf[1] = 0xA; //LF - Line feed character
 
server.on("message", function (msg, rinfo) { //every time new data arrives do this:
  console.log("server got: " + msg.readUInt16LE(0) + " from " + rinfo.address + ":" + rinfo.port); // you can comment this line out
  fs.appendFile('mydata.txt', msg.readUInt16LE(0) + crlf, encoding='utf8');//write the value to file and add CRLF for line break
});
 
server.on("listening", function () {
  var address = server.address();
  console.log("server listening " + address.address + ":" + address.port);
});
 
server.bind(6000); //listen to udp traffic on port 6000
