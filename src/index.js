const camera = require('./camera')
var conf = require('./config.json');
// const controller = require('./controller')
var fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



// controller.init(()=> {

// });

rl.setPrompt('PORT> ');
rl.prompt();

rl.on('line', async function(line) {
    if(line === 'play') {

        controller.write(4)
        await new Promise(resolve => setTimeout(resolve, 2000));
        controller.play(1);camera.takePictures();
        await new Promise(resolve => setTimeout(resolve, 5000));
        controller.write(2)
        await new Promise(resolve => setTimeout(resolve, 5000));
        controller.write('q')
    } else {
        var options = line.split('.')
        var focus = parseInt(options[0]);
        var exposure = parseInt(options[1]);
        camera.getAvailableCameras((devices)=> {
            console.log(devices);
            for(var i=0;i<devices.length;i+=2) {
                device = devices[i]
                deviceId = parseInt(device.slice(device.length - 1))/2;
                camera.takePicture(device, { focus, exposure: exposure*1000 }, (result) => {
                    fs.createWriteStream(conf.camera.picturesFolder + "/camera" + deviceId + "_f" + focus + "_e" + exposure + ".jpg").end(result);
                });
            }
        });
        
    }
    
    rl.prompt();
}).on('close', function() {
    console.log('Have a great day!');
    process.exit(0);
});