var path = require('path');
var conf = require('./config.json');
var v4l2camera = require("@hypersolution/v4l2camera");

 

var availableCameras = [

  '/dev/v4l/by-path/pci-0000:00:14.0-usb-0:6.4.1:1.0-video-index0',
  '/dev/v4l/by-path/pci-0000:00:14.0-usb-0:6.4.2:1.0-video-index0',
  '/dev/v4l/by-path/pci-0000:00:14.0-usb-0:6.4.3:1.0-video-index0',
  '/dev/v4l/by-path/pci-0000:00:14.0-usb-0:6.4.4:1.0-video-index0'

];

function getAvailableCameras(cb) {
  cb(availableCameras);

}

function takePicture(device, options, cb) {
  let cam = new v4l2camera.Camera(device);

  if (cam.configGet().formatName !== "MJPG") {
    console.log("NOTICE: MJPG camera required");
    return;
  }
  // console.log(Object.keys(cam.controls))

  focusAuto = cam.controls['Focus, Auto'];
  focusAbsolute = cam.controls['Focus (absolute)'];
  exposureAuto = cam.controls['Exposure, Auto'];
  exposureAbsolute = cam.controls['Exposure (Absolute)'];
  console.log("Device:", device)
  try {
    cam.start();
  } catch (error) {
    console.error(error)
    cam.stop();
    return;
  }
  cam.controlSet(focusAuto.id, 0)
  cam.controlSet(focusAbsolute.id, options.focus)

  cam.controlSet(exposureAuto.id, 1)
  cam.controlSet(exposureAbsolute.id, options.exposure)
  
  cam.capture((success) => {

    let frame = cam.frameRaw();
    cam.stop(()=>{
      cb(frame, device);
      // fs.createWriteStream(conf.camera.picturesFolder + "/camera" + device.slice(device.length - 1) + ".jpg").end(frame);
    });
  });
}




module.exports = {
  'getAvailableCameras': getAvailableCameras,
  'takePicture': takePicture
};