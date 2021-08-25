

from vidgear.gears import VideoGear
import cv2
import time



# formatting parameters as dictionary attributes
options = {"CAP_PROP_FRAME_WIDTH":160, "CAP_PROP_FRAME_HEIGHT":160, "CAP_PROP_FPS":30}



# define and start the stream on first source ( For e.g #0 index device)
stream1 = VideoGear(source=0, logging=True, **options).start()

# define and start the stream on second source ( For e.g #1 index device)
stream2 = VideoGear(source=1, logging=True, **options).start() 

stream3= VideoGear(source=2, logging=True, **options).start() 

stream4 = VideoGear(source=2, logging=True, **options).start() 

img_counter = 0
# infinite loop
while True:
    
    frameA = stream1.read()
    # read frames from stream1

    frameB = stream2.read()
    # read frames from stream2

    frameC = stream3.read()
    
    frameD = stream4.read()



    
    # check if any of two frame is None
    if frameA is None or frameB is None or frameC is None or frameD is None:
        #if True break the infinite loop
        break
    
    
        




    # do something with both frameA and frameB here
    cv2.imshow("Output Frame1", frameA)
    cv2.imshow("Output Frame2", frameB)
    cv2.imshow("Output Frame3", frameC)
    cv2.imshow("Output Frame4", frameD)
    
    # Show output window of stream1 and stream 2 seperately

    key = cv2.waitKey(1) & 0xFF
    # check for 'q' key-press
    if key == ord("q"):
        #if 'q' key-pressed break out
        break

    if key == ord("w"):
        #if 'w' key-pressed save both frameA and frameB and etc. at same time
        img_name = "opencv_imagef_{}.jpeg".format(img_counter)
        cv2.imwrite(img_name , frameA)
    if key == ord("s"):
        img_name = "opencv_imageb_{}.jpeg".format(img_counter)
        cv2.imwrite(img_name , frameB)
    if key == ord("a"):
        img_name = "opencv_imager_{}.jpeg".format(img_counter)
        cv2.imwrite(img_name , frameC)
    if key == ord("d"): 
        img_name = "opencv_imagel_{}.jpeg".format(img_counter)  
        cv2.imwrite(img_name , frameD)

        img_counter+=1
        

cv2.destroyAllWindows()
# close output window

# safely close both video streams
stream1.stop()
stream2.stop()
stream3.stop()
stream4.stop()