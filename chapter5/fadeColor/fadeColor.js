function fadeColor( from, to, callback, duration, framesPerSecond) {

    // A function wrapper arounf setTimeout that calculates the
    // time to wait based on the frame number
    function doTimeout(color,frame) {
        setTimeout(function() { 
            try {
                callback(color);
            } catch(e) {
                JSLog.write(e);
            }
        }, (duration*1000/framesPerSecond)*frame);
    }

    // The duration of the transition in seconds
    var duration = duration || 1; 
    // The number of animated frams in the given duration
    var framesPerSecond = framesPerSecond || duration*15;
    
    var r,g,b;
    var frame = 1;
    
    // Set the initial start color at frame 0
    doTimeout('rgb(' + from.r + ',' + from.g + ',' + from.b + ')',0);
    
    // Calculate the chage between the RGB values for each interval
    while (frame < framesPerSecond+1) {
        r = Math.ceil(from.r * ((framesPerSecond-frame)/framesPerSecond) 
            + to.r * (frame/framesPerSecond));
        g = Math.ceil(from.g * ((framesPerSecond-frame)/framesPerSecond) 
            + to.g * (frame/framesPerSecond));
        b = Math.ceil(from.b * ((framesPerSecond-frame)/framesPerSecond) 
            + to.b * (frame/framesPerSecond));

        // Call the timeout function for this frame
        doTimeout('rgb(' + r + ',' + g + ',' + b + ')',frame);

        frame++;
    }

}