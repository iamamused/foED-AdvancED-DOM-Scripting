ADS.addEvent(window,'load',function() {
    // Move an element from it's current 
    // position +300px to the right and down
    var moveMe = document.getElementById('element-id');
    ADS.setStyle(moveMe,{
        position:'absolute',
        border:'1px solid black',
        width:'100px',
        height:'20px'
    });
    
    var startLeft = moveMe.offsetLeft;
    var startTop = moveMe.offsetTop;

    // Create the interval
    var mover = setInterval(function() {
        var remove = false;
        var currentLeft = moveMe.offsetLeft;
        var currentTop = moveMe.offsetTop;

        // Move in 2 pixel increments
        var newLeft = currentLeft + 2;
        var newTop = currentTop + 2;
        if (newLeft > startLeft + 300 || newTop > startTop + 300) {
            // If the new position is greater than the desired 
            // target, reset the values to the desired target 
            // and remove the interval

            newLeft = startLeft;
            newTop = startTop;
            //remove = true;
        }
    
        // Reposition the element
        moveMe.style.left = newLeft + 'px';
        moveMe.style.top= newTop + 'px';
    },10);
});