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


async function recTakePictures(i) {
    if(i==devices.length) return;

    controller.write(conf.camera.parameters['camera'+i].led_command)
    console.log(conf.camera.parameters['camera'+i].led_command)
    await new Promise(resolve => setTimeout(resolve, 2000));
    camera.takePicture(i, { path: conf.camera.picturesFolder + "/camera" + (i+1) + ".jpg" }, (error, result) => {
        if(error) console.error(error);

        controller.write('X')
        recTakePictures(i+1)
    });
}

rl.setPrompt('PORT> ');
rl.prompt();

rl.on('line', async function(line) {
    if(line === 'play') {

       // controller.write(4)
        //await new Promise(resolve => setTimeout(resolve, 2000));
       //controller.play(1);
       recTakePictures
        //camera.takePicture();
        //await new Promise(resolve => setTimeout(resolve, 5000));
       // controller.write(2)
       // await new Promise(resolve => setTimeout(resolve, 5000));
        //controller.write('q')
    } else if(line === 'photos') {
        recTakePictures(0)
    } else {
        controller.write(line)
    }
    
    rl.prompt();
}).on('close', function() {
    console.log('Have a great day!');
    process.exit(0);
});