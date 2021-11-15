
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
   
   var led_commands = {
       'LedsOFF': 'O-',
       'LedsON': 'O',
       'LedsLeft': 'A',
       'LedsRight': 'D',
       'LedsTop': 'W',
       'LedsBottom': 'S'
   }

   camera.getAvailableCameras((videos)=> {
       devices = videos;
       console.log(devices);
   });
   
   controller.init(()=> {
       console.log("controller ready")
   });
   
   
   async function recTakePictures(i,imeiInput,bgcolor,led) {
    await new Promise(resolve => {
        camera.takePicture(camera, { path: conf.camera.picturesFolder  + "/" + imeiInput + '_' + (camera+1) + '_' + bgcolor + '_' + led + ".jpg" }, (error, result) => {
            if(error) console.error(error);
             console.log(bgcolor, "Took inside photo: ", bgcolor );
              resolve();
        });

    });

    
   }
   
   
   
   
   
   
async function test(imeiInput, bgcolor, led, camera){
    socket.emit("send",{color: bgcolor});
    console.log(bgcolor, "Changing color to : ", bgcolor );
    await new Promise(resolve =>setTimeout(resolve,500));//1500
    controller.write(led_commands[led]);
    console.log(bgcolor, "Changing leds to : ", led );
    await new Promise(resolve =>setTimeout(resolve,3000));//1500
    console.log(bgcolor, "Taking photo: ", bgcolor );
    await recTakePictures(camera,imeiInput,bgcolor,led);
    console.log(bgcolor, "Took photo: ", bgcolor );

};
    
   
   
   
   
   
   
   
   
   rl.setPrompt('PORT> ');
   rl.prompt();
   
   rl.on('line',async function (imeiInput) {
           console.log(imeiInput);
   
        
        // await new Promise(resolve =>setTimeout(resolve,800));   
     


        console.log(">>>>>>>>>>>>>>>>>>>New test 1" );

        await test(imeiInput,'cyan','LedsOFF',0)
        // await new Promise(resolve =>setTimeout(resolve,5000));    

        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>New test 2" );
        await test(imeiInput,'red','LedsOFF',0)
        // await new Promise(resolve =>setTimeout(resolve,5000)); 


        console.log(">>>>>>>>>>>>>>>>>>>>>>>>New test 3" );

        await test(imeiInput,'white','LedsOFF',0)
        // await new Promise(resolve =>setTimeout(resolve,5000)); 
        console.log(">>>>>>>>>>>>ENDED" );

        

           
        // test(imeiInput,'black','LedsLeft',0)
        // await new Promise(resolve =>setTimeout(resolve,3000));

        // test(imeiInput,'black','LedsRight',0)
        // await new Promise(resolve =>setTimeout(resolve,3000));

        // test(imeiInput,'black','LedsTop',0)
        // await new Promise(resolve =>setTimeout(resolve,3000));

        // test(imeiInput,'black','LedsON',0)
        // await new Promise(resolve =>setTimeout(resolve,3000));


        // test(imeiInput,'black','LedsLeft', 1)
        // await new Promise(resolve =>setTimeout(resolve,3000));

        // test(imeiInput,'black','LedsRight', 1)
        // await new Promise(resolve =>setTimeout(resolve,3000));

        // test(imeiInput,'black','LedsTop', 1)
        // await new Promise(resolve =>setTimeout(resolve,3000));

        // test(imeiInput,'black','LedsON', 1)
        // await new Promise(resolve =>setTimeout(resolve,3000));


        // test(imeiInput,'black','LedsLeft', 2)
        // await new Promise(resolve =>setTimeout(resolve,3000));

        // test(imeiInput,'black','LedsRight', 2)
        // await new Promise(resolve =>setTimeout(resolve,3000));

        // test(imeiInput,'black','LedsBottom', 2)
        // await new Promise(resolve =>setTimeout(resolve,3000));

        // test(imeiInput,'black','LedsON', 2)
        // await new Promise(resolve =>setTimeout(resolve,3000));


        // test(imeiInput,'black','LedsLeft', 3)
        // await new Promise(resolve =>setTimeout(resolve,3000));

        // test(imeiInput,'black','LedsRight', 3)
        // await new Promise(resolve =>setTimeout(resolve,3000));

        // test(imeiInput,'black','LedsTop', 3)
        // await new Promise(resolve =>setTimeout(resolve,3000));

        // test(imeiInput,'black','LedsON', 3)
        // await new Promise(resolve =>setTimeout(resolve,3000));
       
        
   
       rl.prompt();
   }).on('close', function() {
       console.log('Have a great day!');
       process.exit(0);
   });