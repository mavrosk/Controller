const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const conf = require('./config.json');


var port = null;
var parser = null;

var init = (cb) => {
    SerialPort.list().then((ports) => {
        ports = ports.filter(p => p.manufacturer?.includes('Arduino'))
        portObj = ports[0];
        // console.log(portObj);
        port = new SerialPort(portObj.path, { baudRate: 57600 })
        parser = port.pipe(new Readline({ delimiter: '\n' }));
        
        port.on("open", () => {
        //    console.log('serial port open')
            cb();
        });
        port.on('data', data =>{
        //    console.log('got word from arduino:', data);
        });
    });
}


var write = (data) => {
    port.write(data+'\n');
}

const LEDS = 28;

var play = async (times) => {

    for(var j=1;j<=times;j++) {
        for(var i=1;i<=LEDS;i++) {
            port.write('L'+i+'\n');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        for(var i=1;i<=LEDS;i++) {
            port.write('L-'+i+'\n');
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        port.write('S\n');
    }
}

module.exports = {
  'init': init,
  'write': write,
  'play': play
};