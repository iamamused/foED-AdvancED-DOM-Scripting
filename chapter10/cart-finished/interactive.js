
// A load event using Prototype
Event.observe(window, 'load', function(event) {
    
    // Hide all the add and remove buttons
    $$('li.product-item a','li.cart-item a').each(function(e) {
        e.setStyle({
            position:'absolute',
            top:0,
            left:'-10000px'
        });
    });

    // Make all the products draggable in a special queue
    // so you can apply additional effects later
    $$('li.product-item').each(function(e) {
        new Draggable(e,{
            revert:true,
            queue:'cart_draggables'
        });
    });

    // Make all the existing cart items draggable in a special queue
    // so you can remove them from the cart later by applying 
    // additional effects.
    $$('li.cart-item').each(function(e) {
        new Draggable(e,{
            revert:true,
            queue:'cart_draggables'
        });
    });

    // Create a boolen that will be used to indicate 
    // if an item should be removed
    var keepMe = false;
    
    // Make the cart droppable
    Droppables.add($('cart-wrapper'),{
        
        // Accept on products and cart items
        accept:['product-item','cart-item'],

        // Change the class of the cart to indicate when it's the target
        hoverclass:'drop-it',
        
        // Add items to the car as necessary
        onDrop:function(draggable, droppable, event) {
            
            // Items dropped on the cary won't be deleted
            // this will prevent cart item be being removed if 
            // they're dropped within the cart.
            keepMe = true;
            
            // Only add .product-item classes
            if(draggable.className == 'product-item') { 
                
                $('message').innerHTML = 'Contacting server...';
                
                //Save the addition to the server
                new Ajax.Request(
                    draggable.getElementsByTagName('A')[0].getAttribute('href'),
                    {
                        method:'get',       
                        onSuccess: function(response) {
                            $('message').innerHTML = response.responseText;
                            
                            // Create a new DOM node for the list with
                            var newItem = document.createElement('LI');
                            newItem.className = 'cart-item';
                            var newThumb = document.createElement('IMG');
                            var oldImage = draggable.getElementsByTagName('IMG')[0];
                            newThumb.src = oldImage.src;
                            newThumb.alt = oldImage.alt;
                            newItem.appendChild(newThumb);
                            var newAnchor = document.createElement('A');
                            newAnchor.setAttribute('href','server.json?id=' + draggable.id);
                            newAnchor.setAttribute('title','Remove from cart');
                            newAnchor.style.display = 'none';
                            newItem.appendChild(newAnchor);
                            
                            // Make the new items dragable as well
                            new Draggable(newItem,{
                                revert:true,
                                queue:'cart_draggables'
                            });
                            
                            // make the new items fade in
                            new Effect.Opacity(newItem,{from:0,to:1});
                            
                            $('cart').appendChild(newItem);
                        },
                        onFailure: function() {
                            $('message').innerHTML = 'Could not add item.';
                        }
                    }
                );
            }
        }
    });
    
    // Create an observer that will remove items dragged out of the cart
    Draggables.addObserver({
        element: null,
        onEnd:function(eventName, draggable) {
            
            // Get the current position of the draggable so that you
            // cam move it back if the server request fails.
            var delta = draggable.currentDelta();   
            
            if(!keepMe && draggable.element.className == 'cart-item') {
                // This item should be removed
                
                // Calculate the offset position from the original 
                // starting point.
                var top_offset = delta[1]-draggable.delta[1];
                var left_offset = delta[0]-draggable.delta[0];
                
                // Prevent the draggable from reverting while 
                // you check with the server
                draggable.options.revert = false;
                
                new Ajax.Request(
                    draggable.element.getElementsByTagName('A')[0].getAttribute('href'),
                    {
                        method:'get',
                        onSuccess: function(response) {
                            
                            // Removal on the server was successful so 
                            // destroy the draggable and fade it out 
                            $('message').innerHTML = 'Remove: ' + response.responseText;
                            draggable.destroy();
                            
                            // Add the fade to the end of the draggable queue
                            new Effect.Fade(draggable.element, {        
                                duration:0.2, 
                                queue: {
                                    scope:'cart_draggables',
                                    position:'end'
                                },
                                afterFinish: function(){ 
                                    // remove the draggable element once it's finished
                                    draggable.element.remove();
                                }
                            }); 
                        
                        },
                        onFailure:function() {
                            // Removal failed so revert the draggable back to 
                            // it's original position in the cart
                            $('message').innerHTML = 'Item could not be removed';
                            
                            var dur = Math.sqrt(Math.abs(top_offset^2)
                                +Math.abs(left_offset^2))*0.02;
                            
                            new Effect.Move(draggable.element, { 
                                x: -left_offset, 
                                y: -top_offset, 
                                duration: dur,
                                queue: {
                                    scope:'cart_draggables',
                                    position:'end'
                                },
                                afterFinish: function() {
                                    // reset the current delta to the new 
                                    // position and enable revert 
                                    draggable.delta = draggable.currentDelta()
                                    draggable.options.revert = true;
                                }
                            });
                        }
                    }
                );  
            }
            
            // Reset keepMe the flag to false
            keepMe = false;
        }
    });
});