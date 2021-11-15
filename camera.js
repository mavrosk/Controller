var path = require('path');
var conf = require('./config.json');
var fs = require("fs");
var v4l2camera = require("./node_modules/@hypersolution/v4l2camera");

 
var availableCameras = [
  '/dev/v4l/by-path/pci-0000:00:14.0-usb-0:6.1:1.0-video-index0',
  '/dev/v4l/by-path/pci-0000:00:14.0-usb-0:6.2:1.0-video-index0',
  '/dev/v4l/by-path/pci-0000:00:14.0-usb-0:6.3:1.0-video-index0',
  '/dev/v4l/by-path/pci-0000:00:14.0-usb-0:6.4.3:1.0-video-index0'
];
var cameras = [];

function getAvailableCameras(cb) {
  for(var i=0;i<availableCameras.length;i++) {
    cameras.push(new v4l2camera.Camera(availableCameras[i]))
    let cam = cameras[cameras.length-1];
    
    cam.controlSet(cam.controls['Focus, Auto'].id, parseInt(conf.camera.parameters['camera'+i].focus_auto))
    cam.controlSet(cam.controls['Focus (absolute)'].id, parseInt(conf.camera.parameters['camera'+i].focus_absolute))
    cam.controlSet(cam.controls['Exposure, Auto'].id, parseInt(conf.camera.parameters['camera'+i].exposure_auto))
    cam.controlSet(cam.controls['Exposure (Absolute)'].id, parseInt(conf.camera.parameters['camera'+i].exposure_absolute))
    cam.controlSet(cam.controls['White Balance Temperature, Auto'].id, parseInt(conf.camera.parameters['camera'+i].white_balance_auto))
    cam.controlSet(cam.controls['White Balance Temperature'].id, parseInt(conf.camera.parameters['camera'+i].white_balance_temperature))
  }
  
  cb(availableCameras);
}




function takePicture(device, options, cb) {
  let cam = cameras[device];
  console.log("Device:", availableCameras[device])
  if (cam.configGet().formatName !== "MJPG") {
    cb("NOTICE: MJPG camera required", null)
    return;
  }
  try {
    cam.start();
    
    cam.capture((success) => {
      let frame = cam.frameRaw();
      cam.stop(() => {
        fs.createWriteStream(options.path).end(frame);
        cb(null, null);
      })
    });

  } catch (error) {
    cam.stop();
    cb(error, null)
  }
}






module.exports = {
  'getAvailableCameras': getAvailableCameras,
  'takePicture': takePicture
};