fadeColor(
     {r:0,g:255,b:0}, //star color
     {r:255,g:255,b:255}, //end color
     function(color) {
          //aply the color to your elements
          ADS.setStyle(
          	document.body,
          	{'background-color':color}
          );
     },
     3
);
