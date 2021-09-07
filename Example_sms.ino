#include <FastLED.h>

#include <Wire.h>
#include <FastLED.h>

#include <ZerooneSupermodified.h>
#include <Wire.h>
//extern "C" { 
//#include "utility/twi.h"  // from Wire library, so we can do bus scanning
//}

long POS[4];
ZerooneSupermodified motor(ZO_HW_SERIAL_1,13);
int nonodes = 10 ; // Set this equal to the number of SErvos/mAGENC WE HAVE!
int mid=4;
int32_t value=20000000;
volatile boolean homed;

#define LED_PIN     6
#define NUM_LEDS    28

CRGB leds[NUM_LEDS];

void setup(){
  
FastLED.addLeds<WS2812, LED_PIN, GRB>(leds, NUM_LEDS);
 Serial.begin(57600);
 Serial1.begin(57600);

for (int q= 4 ; q <= nonodes ; q++){
motor.resetErrors(q);
delay(200);
}

Serial.print("STARTING MOTORS : ");
unsigned int entry_time = 0xffff & millis();

for (int q= 4 ; q <= nonodes ; q++) {
boolean read_bit = motor.getDigitalIOConfiguration(q, 1) ;
boolean error_flag = motor.getCommunicationSuccess();
unsigned int warning ;

if (!error_flag) {warning = motor.getWarning();}
if (!error_flag) {Serial.print(warning); Serial.print(" ");}
else {Serial.print(q); Serial.print(":") ;Serial.print(read_bit); Serial.print(" ");}
delay(100);
}

Serial.print(">>>");
unsigned int execution_time = (0xffff + millis() - entry_time)%0xffff;
Serial.print("executed in ");
Serial.print(execution_time);
Serial.println(" milliseconds ");
int h=0;
for (int q= 4 ; q <= nonodes ; q++){
motor.start(q);
delay(200);
}
motor.start(9);
motor.start(10);
}

void loop()
{
      int32_t pos1=280000  ; 
       int32_t pos2=140000  ;  
  
  
  
  if ( Serial.available()) {
    int c = Serial.read();

if (c=='o'){
  
//bool homed=false;  
int h=motor.getAnalogIn(9,1);
Serial.println(h);
if (h<1000){
h=motor.getAnalogIn(9,1);

 while (h<800){
 motor.profiledMoveWithVelocity(9,-5000); 
Serial.println(h);
 }
 motor.halt(9);
}
if (h>>1000){
  Serial.print(h);
bool homed=true;
motor.moveToAbsolutePosition(9,8192);
}
 
}

if (c=='a'){
  
uint16_t h=motor.getAnalogIn(9,0);
delay(20);
uint16_t h1=motor.getAnalogIn(9,1);
delay(20);
uint16_t h2=motor.getAnalogIn(9,2);
delay(20);
uint16_t h3=motor.getAnalogIn(9,3);
delay(20);
uint16_t h4=motor.getAnalogIn(9,4);
delay(20);
uint16_t h5=motor.getAnalogIn(9,5);
Serial.println();
Serial.println(h);
Serial.println(h1);
Serial.println(h2);
Serial.println(h3);
Serial.println(h4);
Serial.println(h5);
delay(200);
motor.resetErrors(9); 

delay(100);

 }
 
if (c=='g'){
  //bool homed=false;  
int h=0;
h=motor.getAnalogIn(9,1);
Serial.println(h);
delay(20);
h=motor.getAnalogIn(9,0);
Serial.println(h);
if (h<1000){
h=motor.getAnalogIn(9,0);
Serial.println(h);
delay(20);
h=motor.getAnalogIn(9,1);
Serial.println(h);
delay(20);
 while (h<800){
 motor.profiledMoveWithVelocity(9,-3000); 
h=motor.getAnalogIn(9,0);
Serial.println(h);
delay(20);
Serial.println(h);
delay(20);

 }
 motor.halt(9);
}
if (h>>1000){
  Serial.print(h);
bool homed=true;
motor.moveToAbsolutePosition(9,8192);
}
 
}

if (c=='q'){
  
//bool homed=false;  
uint16_t h1=0;
uint16_t h2=0;
uint16_t h3=0;
int a=0;

h1=motor.getAnalogIn(9,1);

a=0;
delay(20);
Serial.println(h1);
delay(20);
h1=0;
 while (h1<900||a==11){
  a++;
  delay(10);
h1=motor.getAnalogIn(9,1);
Serial.print("s-");
Serial.println(h1);

delay(10);
 motor.moveToRelativePosition(9,-200000); 

 }
 a=10;
 motor.halt(9);

if (h1>>990){
  Serial.println(h1);
  Serial.println('yupi');
bool homed=true;
motor.moveToAbsolutePosition(9,8192);
}
 
}

if (c=='w'){
  
//bool homed=false;  
uint16_t h1=0;
uint16_t h2=0;
uint16_t h3=0;
int a=0;

h1=motor.getAnalogIn(9,1);

a=0;
delay(20);
Serial.println(h1);
delay(20);
h1=0;
 while (h1<900||a==11){
  a++;
  delay(20);
h1=motor.getAnalogIn(9,1);
Serial.print("s-");
Serial.println(h1);

delay(50);
 motor.moveWithVelocity(9,-9000); 

delay(20);
 }
 a=10;
 motor.halt(9);

if (h1>>990){
  Serial.println(h1);
  Serial.println('yupi');
bool homed=true;
motor.moveToAbsolutePosition(9,8192);
}
 
}

    
if (c=='8'){
if (homed=true) {
 motor.moveToRelativePosition(10,200); 
 motor.profiledMoveToRelativePosition(9,280000);
}
}

 if (c=='0'){
      motor.moveToRelativePosition(9,-10000);
     
 }     
  
 if (c=='1'){
      motor.moveToRelativePosition(9,10000);
     
 }         
 
if (c=='2'){
      motor.moveToAbsolutePosition(9,pos1);
      
 }         
 
 if (c=='3'){
      motor.moveToAbsolutePosition(9,0);
      
      delay(1500);
 }         

if (c=='4'){
      motor.moveToAbsolutePosition(9,pos2);
      
 }         


    if (c=='9'){
      delay(50); 
      
      motor.profiledMoveToAbsolutePosition(9,pos2);
         }
   
   if (c=='x'){
      delay(50); 
      motor.profiledMoveToAbsolutePosition(9,0);
         }
   if (c=='t'){
    motor.profiledMoveToAbsolutePosition(10,-2500);
    delay(2500);
    motor.profiledMoveToAbsolutePosition(10,0);
   }
     
     if (c=='b'){
      motor.moveToRelativePosition(9,-280000);
           }
  if (c=='n'){
      motor.moveToRelativePosition(9,280000);
           }

    if (c=='v'){
      motor.moveToAbsolutePosition(9,0);
      delay(100);
      motor.moveToAbsolutePosition(9,140000);
      
      //Tray
      motor.moveToAbsolutePosition(10,-2500);
      //Tray
      motor.halt(4);
      motor.halt(5);
      delay(3000);
      motor.profiledMoveToAbsolutePosition(4,0);
      delay(100);
      motor.profiledMoveToAbsolutePosition(5,0);
      motor.profiledMoveToAbsolutePosition(10,0);
      delay(15000);
      }
    

    if (c=='u'){
      motor.moveToRelativePosition(8,100000);
    }

 
 if (c=='d'){
      motor.moveToRelativePosition(8,-100000);
    }


    if (c=='s'){
      motor.start(4);
      motor.start(5);
      motor.start(9);
      motor.start(10);
    }

if (c=='l'){
  motor.start(9);
  delay(20);
for (int q= 0 ; q <= 100 ; q++){
      motor.profiledMoveToAbsolutePosition(9,pos1);
      delay(5000);
            motor.profiledMoveToAbsolutePosition(9,pos2);
      delay(5000);
      motor.profiledMoveToAbsolutePosition(9,0);
      delay(5000);
      motor.moveToAbsolutePosition(9,pos1);
      delay(5000);
            motor.moveToAbsolutePosition(9,pos2);
      delay(5000);
      motor.moveToAbsolutePosition(9,0);
      delay(5000);
}                    
                  
 }         
 


if (c=='h'){
      motor.halt(4);
      motor.halt(5);
      motor.halt(9);
      motor.halt(10);
    }
if (c=='r'){
      motor.resetErrors(4);
      motor.resetErrors(5);
      motor.resetErrors(9);
      motor.resetErrors(10);
    }
if (c=='H'){
  
    leds[0] = CRGB(255, 255, 255);
    FastLED.show();  
    leds[1] = CRGB(255, 255, 255);
    FastLED.show();
    leds[2] = CRGB(255, 255, 255);
    FastLED.show();
    leds[3] = CRGB(255, 255, 255);
    FastLED.show();
    leds[4] = CRGB(0, 0, 0);
    FastLED.show();
    leds[5] = CRGB(0, 0, 0);
    FastLED.show();
    leds[6] = CRGB(0, 0, 0);
    FastLED.show();
    leds[7] = CRGB(0, 0, 0);
    FastLED.show();
    leds[8] = CRGB(0, 0, 0);
    FastLED.show();
    leds[9] = CRGB(0, 0, 0);
    FastLED.show();
    leds[10] = CRGB(0, 0, 0);
    FastLED.show();
    leds[11] = CRGB(0, 0, 0);
    FastLED.show();
    leds[12] = CRGB(0, 0, 0);
    FastLED.show();
    leds[13] = CRGB(0, 0, 0);
    FastLED.show();
    leds[14] = CRGB(255, 255, 255);
    FastLED.show();
    leds[15] = CRGB(255, 255, 255);
    FastLED.show();
    leds[16] = CRGB(255, 255, 255);
    FastLED.show();
    leds[17] = CRGB(255, 255, 255);
    FastLED.show();
    leds[18] = CRGB(255, 255, 255);
    FastLED.show();
    leds[19] = CRGB(0, 0, 0);
    FastLED.show();
    leds[20] = CRGB(0, 0, 0);
    FastLED.show();
    leds[21] = CRGB(0, 0, 0);
    FastLED.show();
    leds[22] = CRGB(0, 0, 0);
    FastLED.show();
    leds[23] = CRGB(0, 0, 0);
    FastLED.show();
    leds[24] = CRGB(0, 0, 0);
    FastLED.show();
    leds[25] = CRGB(0, 0, 0);
    FastLED.show();
    leds[26] = CRGB(0, 0, 0);
    FastLED.show();
    leds[27] = CRGB(255, 255, 255);
    FastLED.show();
  } 
    if (c=='L') {

   leds[0] = CRGB(255, 255, 255);
    FastLED.show();
    leds[1] = CRGB(255, 255, 255);
    FastLED.show();
    leds[2] = CRGB(255, 255, 255);
    FastLED.show();
    leds[3] = CRGB(255, 255, 255);
    FastLED.show();
    leds[4] = CRGB(255, 255, 255);
    FastLED.show();
    leds[5] = CRGB(0, 0, 0);
    FastLED.show();
    leds[6] = CRGB(0, 0, 0);
    FastLED.show();
    leds[7] = CRGB(0, 0, 0);
    FastLED.show();
    leds[8] = CRGB(0, 0, 0);
    FastLED.show();
    leds[9] = CRGB(0, 0, 0);
    FastLED.show();
    leds[10] = CRGB(0, 0, 0);
    FastLED.show();
    leds[11] = CRGB(0, 0, 0);
    FastLED.show();
    leds[12] = CRGB(0, 0, 0);
    FastLED.show();
    leds[13] = CRGB(255, 255, 255);
    FastLED.show();
    leds[14] = CRGB(255, 255, 255);
    FastLED.show();
    leds[15] = CRGB(255, 255, 255);
    FastLED.show();
    leds[16] = CRGB(255, 255, 255);
    FastLED.show();
    leds[17] = CRGB(255, 255, 255);
    FastLED.show();
    leds[18] = CRGB(0, 0, 0);
    FastLED.show();
    leds[19] = CRGB(0, 0, 0);
    FastLED.show();
    leds[20] = CRGB(0, 0, 0);
    FastLED.show();
    leds[21] = CRGB(0, 0, 0);
    FastLED.show();
    leds[22] = CRGB(0, 0, 0);
    FastLED.show();
    leds[23] = CRGB(0, 0, 0);
    FastLED.show();
    leds[24] = CRGB(0, 0, 0);
    FastLED.show();
    leds[25] = CRGB(0, 0, 0);
    FastLED.show();
    leds[26] = CRGB(0, 0, 0);
    FastLED.show();
    leds[27] = CRGB(0, 0, 0);
    FastLED.show();
    
  }
  if (c=='S') {

   leds[0] = CRGB(0, 0, 0);
    FastLED.show();
    leds[1] = CRGB(0, 0, 0);
    FastLED.show();
    leds[2] = CRGB(0, 0, 0);
    FastLED.show();
    leds[3] = CRGB(0, 0, 0);
    FastLED.show();
    leds[4] = CRGB(0, 0, 0);
    FastLED.show();
    leds[5] = CRGB(0, 0, 0);
    FastLED.show();
    leds[6] = CRGB(0, 0, 0);
    FastLED.show();
    leds[7] = CRGB(0, 0, 0);
    FastLED.show();
    leds[8] = CRGB(0, 0, 0);
    FastLED.show();
    leds[9] = CRGB(0, 0, 0);
    FastLED.show();
    leds[10] = CRGB(0, 0, 0);
    FastLED.show();
    leds[11] = CRGB(0, 0, 0);
    FastLED.show();
    leds[12] = CRGB(0, 0, 0);
    FastLED.show();
    leds[13] = CRGB(0, 0, 0);
    FastLED.show();
    leds[14] = CRGB(0, 0, 0);
    FastLED.show();
    leds[15] = CRGB(0, 0, 0);
    FastLED.show();
    leds[16] = CRGB(0, 0, 0);
    FastLED.show();
    leds[17] = CRGB(0, 0, 0);
    FastLED.show();
    leds[18] = CRGB(0, 0, 0);
    FastLED.show();
    leds[19] = CRGB(0, 0, 0);
    FastLED.show();
    leds[20] = CRGB(0, 0, 0);
    FastLED.show();
    leds[21] = CRGB(0, 0, 0);
    FastLED.show();
    leds[22] = CRGB(0, 0, 0);
    FastLED.show();
    leds[23] = CRGB(0, 0, 0);
    FastLED.show();
    leds[24] = CRGB(0, 0, 0);
    FastLED.show();
    leds[25] = CRGB(0, 0, 0);
    FastLED.show();
    leds[26] = CRGB(0, 0, 0);
    FastLED.show();
    leds[27] = CRGB(0, 0, 0);
    FastLED.show();
    
  }
  if (c=='I'){
  
    leds[0] = CRGB(255, 255, 255);
    FastLED.show();  
    leds[1] = CRGB(255, 255, 255);
    FastLED.show();
    leds[2] = CRGB(255, 255, 255);
    FastLED.show();
    leds[3] = CRGB(255, 255, 255);
    FastLED.show();
    leds[4] = CRGB(0, 0, 0);
    FastLED.show();
    leds[5] = CRGB(0, 0, 0);
    FastLED.show();
    leds[6] = CRGB(0, 0, 0);
    FastLED.show();
    leds[7] = CRGB(0, 0, 0);
    FastLED.show();
    leds[8] = CRGB(0, 0, 0);
    FastLED.show();
    leds[9] = CRGB(0, 0, 0);
    FastLED.show();
    leds[10] = CRGB(0, 0, 0);
    FastLED.show();
    leds[11] = CRGB(0, 0, 0);
    FastLED.show();
    leds[12] = CRGB(0, 0, 0);
    FastLED.show();
    leds[13] = CRGB(0, 0, 0);
    FastLED.show();
    leds[14] = CRGB(255, 255, 255);
    FastLED.show();
    leds[15] = CRGB(255, 255, 255);
    FastLED.show();
    leds[16] = CRGB(255, 255, 255);
    FastLED.show();
    leds[17] = CRGB(255, 255, 255);
    FastLED.show();
    leds[18] = CRGB(0, 0, 0);
    FastLED.show();
    leds[19] = CRGB(0, 0, 0);
    FastLED.show();
    leds[20] = CRGB(0, 0, 0);
    FastLED.show();
    leds[21] = CRGB(0, 0, 0);
    FastLED.show();
    leds[22] = CRGB(0, 0, 0);
    FastLED.show();
    leds[23] = CRGB(0, 0, 0);
    FastLED.show();
    leds[24] = CRGB(0, 0, 0);
    FastLED.show();
    leds[25] = CRGB(0, 0, 0);
    FastLED.show();
    leds[26] = CRGB(0, 0, 0);
    FastLED.show();
    leds[27] = CRGB(255, 255, 255);
    FastLED.show();
  } 

  if (c=='O'){
  
    leds[0] = CRGB(255, 255, 255);
    FastLED.show();  
    leds[1] = CRGB(255, 255, 255);
    FastLED.show();
    leds[2] = CRGB(255, 255, 255);
    FastLED.show();
    leds[3] = CRGB(255, 255, 255);
    FastLED.show();
    leds[4] = CRGB(0, 0, 0);
    FastLED.show();
    leds[5] = CRGB(0, 0, 0);
    FastLED.show();
    leds[6] = CRGB(0, 0, 0);
    FastLED.show();
    leds[7] = CRGB(0, 0, 0);
    FastLED.show();
    leds[8] = CRGB(0, 0, 0);
    FastLED.show();
    leds[9] = CRGB(0, 0, 0);
    FastLED.show();
    leds[10] = CRGB(0, 0, 0);
    FastLED.show();
    leds[11] = CRGB(0, 0, 0);
    FastLED.show();
    leds[12] = CRGB(0, 0, 0);
    FastLED.show();
    leds[13] = CRGB(0, 0, 0);
    FastLED.show();
    leds[14] = CRGB(255, 255, 255);
    FastLED.show();
    leds[15] = CRGB(255, 255, 255);
    FastLED.show();
    leds[16] = CRGB(255, 255, 255);
    FastLED.show();
    leds[17] = CRGB(255, 255, 255);
    FastLED.show();
    leds[18] = CRGB(255, 255, 255);
    FastLED.show();
    leds[19] = CRGB(0, 0, 0);
    FastLED.show();
    leds[20] = CRGB(0, 0, 0);
    FastLED.show();
    leds[21] = CRGB(0, 0, 0);
    FastLED.show();
    leds[22] = CRGB(0, 0, 0);
    FastLED.show();
    leds[23] = CRGB(0, 0, 0);
    FastLED.show();
    leds[24] = CRGB(0, 0, 0);
    FastLED.show();
    leds[25] = CRGB(0, 0, 0);
    FastLED.show();
    leds[26] = CRGB(0, 0, 0);
    FastLED.show();
    leds[27] = CRGB(0, 0, 0);
    FastLED.show();
  } 
    
 c='0'  ;       
    }
    
}
