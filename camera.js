var path = require('path');
var conf = require('./config.json');
var v4l2camera = require("@hypersolution/v4l2camera");
var NodeWebcam = require('node-webcam');
Webcam = NodeWebcam.create({});

 

var availableCameras = [];

function getAvailableCameras(cb) {
  Webcam.list((devices) => {
    // devices = devices.filter((a)=>a.includes('4K'))
    availableCameras = devices;
    cb(devices);
  })
}

async function takePicture(device, options, cb) {
  
  var cam = new v4l2camera.Camera(device);

  if (cam.configGet().formatName !== "MJPG") {
    console.log("NOTICE: MJPG camera required");
    return;
  }
  // console.log(Object.keys(cam.controls))

  focusAuto = cam.controls['Focus, Auto'];
  focusAbsolute = cam.controls['Focus (absolute)'];
  exposureAuto = cam.controls['Exposure, Auto'];
  exposureAbsolute = cam.controls['Exposure (Absolute)'];

  cam.start();
  cam.controlSet(focusAuto.id, 0)
  cam.controlSet(focusAbsolute.id, options.focus)

  cam.controlSet(exposureAuto.id, 1)
  cam.controlSet(exposureAbsolute.id, options.exposure)
  
  await new Promise(resolve => setTimeout(resolve, 500));
  cam.capture((success) => {

    let frame = cam.frameRaw();
    cam.stop(()=>{
      cb(frame);
      // fs.createWriteStream(conf.camera.picturesFolder + "/camera" + device.slice(device.length - 1) + ".jpg").end(frame);
    });
  });
}




module.exports = {
  'getAvailableCameras': getAvailableCameras,
  'takePicture': takePicture
};