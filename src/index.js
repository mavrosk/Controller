const camera = require('./camera')
// const controller = require('./controller')
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var devices = [];
camera.getAvailableCameras((d)=> {
     console.log(d);
     devices = d;
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
        camera.takePicture(devices[0], 300, parseInt(line)*1000);
    }
    
    rl.prompt();
}).on('close', function() {
    console.log('Have a great day!');
    process.exit(0);
});