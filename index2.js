const camera = require('./camera')
var conf = require('./config.json');
const controller = require('./controller')
var fs = require("fs");
const readline = require("readline");
const {io} = require('socket.io-client');

const socket = io("https://greenpanda-socket-server.herokuapp.com/")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var devices = [];

camera.getAvailableCameras((videos)=> {
    devices = videos;
    console.log(devices);
});

controller.init(()=> {
    console.log("controller ready")
});


async function recTakePictures(i,imeiInput,bgcolor,led) {
    if(i==devices.length) return;

    //controller.write(conf.camera.parameters['camera'+i].led_command)
    //console.log(conf.camera.parameters['camera'+i].led_command)
    //await new Promise(resolve => setTimeout(resolve, 2000));
    camera.takePicture(i, { path: conf.camera.picturesFolder  + "/camera" + (i+1)+ '_' + imeiInput + '_' + bgcolor + '_' + led + ".jpg" }, (error, result) => {
        if(error) console.error(error);

        controller.write('X')
        recTakePictures(i+1)
    });
}






async function test(imeiInput,bgcolor,camera,led){
    socket.emit("send",{color:bgcolor});
    
    
        
        controller.write(led);
        await new Promise(resolve =>setTimeout(resolve,2000));
        recTakePictures(camera,imeiInput,bgcolor,led);
        // await new Promise(resolve =>setTimeout(resolve,1000));
    };









rl.setPrompt('PORT> ');
rl.prompt();

rl.on('line',async function (imeiInput) {
        console.log(imeiInput);


    controller.write('v');
        
    ////TOP CAMERA/////
    test(imeiInput,'black',2,'A')
    await new Promise(resolve =>setTimeout(resolve,4000));

    test(imeiInput,'black',2,'D')
    await new Promise(resolve =>setTimeout(resolve,4000));

    test(imeiInput,'black',2,'W')
    await new Promise(resolve =>setTimeout(resolve,4000));

    test(imeiInput,'black',2,'O')
    await new Promise(resolve =>setTimeout(resolve,4000));



    await new Promise(resolve =>setTimeout(resolve,4000));



    /////BACK CAMERA////
    test(imeiInput,'black',3,'A')
    await new Promise(resolve =>setTimeout(resolve,4000));

    test(imeiInput,'black',3,'D')
    await new Promise(resolve =>setTimeout(resolve,4000));
 
    test(imeiInput,'black',3,'W')
    await new Promise(resolve =>setTimeout(resolve,4000));
    
    test(imeiInput,'black',3,'O')
    await new Promise(resolve =>setTimeout(resolve,4000));



    await new Promise(resolve =>setTimeout(resolve,4000));



    //////FRONT CAMERA/////
    test(imeiInput,'black',0,'A')
    await new Promise(resolve =>setTimeout(resolve,4000));

    test(imeiInput,'black',0,'D')
    await new Promise(resolve =>setTimeout(resolve,4000));
 
    test(imeiInput,'black',0,'W')
    await new Promise(resolve =>setTimeout(resolve,4000));
    
    test(imeiInput,'black',0,'O')
    await new Promise(resolve =>setTimeout(resolve,4000));


    await new Promise(resolve =>setTimeout(resolve,4000));



    //////BOTTOM CAMERA//////
    test(imeiInput,'black',1,'A')
    await new Promise(resolve =>setTimeout(resolve,4000));

    test(imeiInput,'black',1,'D')
    await new Promise(resolve =>setTimeout(resolve,4000));
 
    test(imeiInput,'black',1,'W')
    await new Promise(resolve =>setTimeout(resolve,4000));
    
    test(imeiInput,'black',1,'O')
    await new Promise(resolve =>setTimeout(resolve,4000));


    await new Promise(resolve =>setTimeout(resolve,4000));

      

    test(imeiInput,'cyan',0,'O-')
    await new Promise(resolve =>setTimeout(resolve,4000));    
     
    test(imeiInput,'red',0,'O-')
    await new Promise(resolve =>setTimeout(resolve,4000)); 
       
    test(imeiInput,'white',0,'O-')
    await new Promise(resolve =>setTimeout(resolve,4000)); 
     

    rl.prompt();
}).on('close', function() {
    console.log('Have a great day!');
    process.exit(0);
});