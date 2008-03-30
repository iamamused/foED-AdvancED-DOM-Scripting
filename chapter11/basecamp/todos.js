var todoContainer;
var todoList;

function createTodoBar(data) {
    // Create a container to hold the todo list elements
    todoContainer = document.createElement('DIV');
    
    // Style the container
    ADS.setStyle(todoContainer,{
        'width': '250px',
        'overflow': 'hidden',
        'border': '1px solid #ccc', 
        'border-right-width' : '5px', 
        'background': '#fed url(images/todo.gif) no-repeat right top', 
        'color': '#000',
        'font':' 12px/13px verdana,tahoma,sans',
        'text-align':'left'
    });
    
    // Set the starting position so that only a small
    // bar is left in the window
    var basePosition= {
        'position' : 'absolute',
        'opacity' : '.55',
        'z-index' : '2000',  
        'top' : '20px',
        'left' : '-235px'
    }
    ADS.setStyle(todoContainer,basePosition);
    
    // On mouseout set the style to the base position
    ADS.addEvent(todoContainer,'mouseout',function() {
        ADS.setStyle(todoContainer,basePosition);
    });
    
    // Set the hover position so that the window 
    // pops out of the side
    var hoverPosition= {
        'opacity' : '1',
        'left' : '0px'
    }
    // On mouseover set the hover position
    ADS.addEvent(todoContainer,'mouseover',function() {
        ADS.setStyle(todoContainer,hoverPosition);
    });
    
    // Add a header
    var h4 = document.createElement('h4');
    ADS.setStyle(h4,{
        'color': '#000',
        'padding': '5px 20px',
        'margin': '5px',
        'font':'bold 12px/13px verdana,tahoma,sans',
        'text-align':'center'
    });    
    h4.appendChild(document.createTextNode('Todo: ' + data.name));
    todoContainer.appendChild(h4);
    
    // Add a form so that you can add new items to the list
    var form = document.createElement('form');
    ADS.setStyle(form,{
        'display': 'inline',
        'border': '0',
        'padding': '0'
    });
    
    var text = document.createElement('input');
    text.setAttribute('type','text');
    ADS.setStyle(text,{
        'width':'200px',
        'margin':'5px 20px',
        'margin-right': '25px'
    });
    
    var submit = document.createElement('input');
    submit.setAttribute('type','submit');
    submit.setAttribute('value','add');
    ADS.setStyle(submit,{
        'width':'200px',
        'margin':'5px 20px',
        'margin-right': '25px'
    });
 
    form.appendChild(text);
    form.appendChild(submit);
    todoContainer.appendChild(form);
    
    // Create a list for the todo items    
    todoList = document.createElement('UL');    
    ADS.setStyle(todoList,{
        'height':'170px',
        'border':'1px solid black',
        'padding': '0',
        'margin': '5px 25px 20px 20px',
        'list-style':'none',
        'overflow': 'auto',
        'background':'white'
    });
    
    todoContainer.appendChild(todoList);
    document.body.appendChild(todoContainer);
    
    
    // On submit, contact the server proxy to add the new item.
    ADS.addEvent(form,'submit',function(W3CEvent) {
        
        if(text.value) {
        // Only run the request if there is a value
        ADS.ajaxRequest('proxy.php?do=create&todo=' + escape(text.value),{
            completeListener:function() {
                
                // When the request is done re-fetch all the items
                // that should be in the list
                ADS.ajaxRequest('proxy.php?do=list',{
                    completeListener:function() {
                        text.value='';
                        eval('addTodoItems(' + this.responseText + ')');
                    }
                });
            }
        });
        
        }
        
        var event = ADS.getEventObject(W3CEvent);
        ADS.preventDefault(event);
        
    });

}

function addTodoItems(data) {
    // Re-populate the list with the new items
    ADS.removeChildren(todoList);
    for (var i in data['todo-items']['todo-item']) {
        var item = data['todo-items']['todo-item'][i];
        if(item.completed == 'false') {
            var li = document.createElement('li');
            li.appendChild(document.createTextNode(item.content));
            ADS.setStyle(li,{
                'border': '0',
                'padding': '0.25em',
                'margin': '0',
                'border-bottom': '1px dotted #ccc'
            });
            todoList.appendChild(li);
        }
    }
}

// when the page loads create the todo list box and populate it
ADS.addEvent(window,'load',function() {
    ADS.ajaxRequest('proxy.php?do=list',{
        completeListener:function() {
            eval('createTodoBar(' + this.responseText + ')');
            eval('addTodoItems(' + this.responseText + ')');
        }
    });
});