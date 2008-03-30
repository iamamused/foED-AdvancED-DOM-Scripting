var sound = 'Roar!';
function myOrneryBeast() {
    this.style.color='green';
    alert(sound);
}

try {
    myOrneryBeast();
} catch(theException) {
    alert('Oops, we caught an exception! Name: ' 
        + theException.name 
        + ', message: '
        + theException.message
    );
}
