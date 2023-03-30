
const RegisteredEvents = {}; 
    
function renderTriggerElements() {
    //Get all elements with the class "children_trigger_event" and add class "trigger_event" to each child element
    var triggerElements = document.querySelectorAll('.children_trigger_event');
    triggerElements.forEach(function(element) {

        //Get the data attributes from the parent element  
        var event_targets = element.getAttribute('data-event-targets');
        var event_types = element.getAttribute('data-event-types');
        var children = element.children;

        //Add class "trigger_event" to each child element
        for (var i = 0; i < children.length; i++) {
            child = children[i];
            child.classList.add('trigger_event');
            child.setAttribute('data-event-targets', event_targets);
            child.setAttribute('data-event-types', event_types);
        }

        //Remove the class "children_trigger_event" from the parent element
        element.classList.remove('children_trigger_event');
        element.removeAttribute('data-event-targets');
        element.removeAttribute('data-event-types');
    });

}

function startEventListeners() {
    //Get all elements with the class "trigger_event"
    var triggerElements = document.querySelectorAll('.trigger_event');
    triggerElements.forEach(function(element) {
        //Get the data attributes from the element
        var event_targets = element.getAttribute('data-event-targets');
        var event_types = element.getAttribute('data-event-types');

        //Add event listeners to each element
        event_types.split(',').forEach(function(event_type) {

            //Add event listener
            element.addEventListener(event_type, function() {

                //Trigger the event

                event_targets.split(',').forEach(function(event_target) {
                    triggerEvent(event_target, element);
                });

            });

        });

    });

}

function renderDataValues(data_values, element) {

    //console.log(data_values);
    //Split the data-values into an array
    var data_values = data_values.split(',');
    var rendered_data_values = [];

    //Render each data-values
    data_values.forEach(function(data_value) {
        rendered_data_values.push(renderDataValue(data_value, element));
    });

    //console.log(rendered_data_values);

    //Return the rendered data-values
    return rendered_data_values;
}

function renderDataValue(data_value, element) {
    //If data-values is prefixed with "self-", get the value from the element
    if (data_value.startsWith('self-')) {
        if (data_value == "self-self") {
            data_value = element;
        } else if (data_value == "self-children") {
            data_value = element.children;
        } else if (data_value == "self-parent") {
            data_value = element.parentElement;
        } else if (data_value == "self-classes") {
            data_value = cleanseClasses(element.classList);
        } else if (data_value == "self-attributes") {
            data_value = element.attributes;
        } else if (data_value == "self-value") {
            data_value = element.value;
        } else if (data_value == "self-text") {
            data_value = element.innerText;
        } else if (data_value == "self-html") {
            data_value = element.innerHTML;
        } else if (data_value == "self-id") {
            data_value = element.id;
        } else if (data_value == "self-name") {
            data_value = element.name;
        } else if (data_value == "self-type") {
            data_value = element.type;
        } else if (data_value == "self-tag") {
            data_value = element.tagName;
        } 

    }

    //If data-values is prefixed with point-, get the value from the element
    if (data_value.startsWith('point-')) {
        //Find the element that matches the data-values
        var data_value = document.querySelector(data_value.substring(6));

        //If the element is not found, return
        if (data_value == null) {
            //console.log('Element not found | ' + data_value + ' |');
            return;
        }
    }

    //If data-values is prefixed with "extract-", get the value from the element
    if (data_value.startsWith('extract-')) {
        //Find the element that matches the data-values
        //console.log("Finding element: " + data_value.substring(8));
        var pointerElement = document.querySelector(data_value.substring(8));

        //If the element is not found, return
        if (pointerElement == null) {
            //console.log('Element not found | ' + data_value + ' |');
            return;
        }

        //Get the data-values from the element
        data_value = pointerElement.getAttribute('data-values');

        //console.log("RECURING: " + data_value);

        data_value = renderDataValues(data_value, pointerElement);

    }

    return data_value;

}

function triggerEvent(event_id, element) {
    //Check if the event is registered
    if (event_id in RegisteredEvents) {
        //Get the event object from the RegisteredEvents array
        var event = RegisteredEvents[event_id];

        //Check if the event has any execution functions
        if (event.execution_functions.length == 0) {
            //console.log('No execution functions registered for event | ' + event_id + ' |');
            return;
        }

        //Run the event execution functions
        event.execution_functions.forEach(function(execution_function) {

            //Get data-values from the element
            var data_values = element.getAttribute('data-values');

            //console.log(data_values);

            //Render the data-values
            data_values = renderDataValues(data_values, element);
            execution_function(data_values);
        });

    } else {
        //console.log('Event not registered | ' + event_id + ' |');
    }
}

function registerEventFunction(event_id, execution_function) {
    //Check if the event is registered
    if (event_id in RegisteredEvents) {
        //Get the event object from the RegisteredEvents array
        var event = RegisteredEvents[event_id];

        //Add the execution function to the event object
        event.execution_functions.push(execution_function);

    } else {
        registerEvent(event_id, execution_function);
    }
}

function registerEvent(event_id, execution_function) {
    //Create the event object
    var event = {
        id: event_id,
        execution_functions: []
    };

    //Add the execution function to the event object
    event.execution_functions.push(execution_function);

    //Add the event object to the RegisteredEvents array
    RegisteredEvents[event_id] = event;

}

function sendEvent(event_id, data_value) {

    //If data_value is not an array, make it an array
    if (!Array.isArray(data_value)) {
        data_value = [data_value];
    }

    //Check if the event is registered
    if (event_id in RegisteredEvents) {
        //Get the event object from the RegisteredEvents array
        var event = RegisteredEvents[event_id];

        //Check if the event has any execution functions
        if (event.execution_functions.length == 0) {
            //console.log('No execution functions registered for event | ' + event_id + ' |');
            return;
        }

        //Run the event execution functions
        event.execution_functions.forEach(function(execution_function) {
            execution_function(data_value);
        });

    } else {
        //console.log('Event not registered');
    }
}

function eventTargetsMe(data_value, element) {
    console.log(data_value);
    //Check if data_value is an array or not
    if (Array.isArray(data_value)) {
        //Loop through the array
        for (var i = 0; i < data_value.length; i++) {
            return eventTargetsMe(data_value[i], element);
        }
    } else {

        if (data_value == element || data_value == 'all' || classMatch(data_value, element) || idMatch(data_value, element)) {
            return true;
        } else {
            return false;
        }

    }

}

function classMatch(data_value, element) {
    if (data_value.startsWith('.')) {
        var class_name = data_value.substring(1);
        if (element.classList.contains(class_name)) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function idMatch(data_value, element) {
    if (data_value.startsWith('#')) {
        var id_name = data_value.substring(1);
        if (element.id == id_name) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function() {

    //Render any multi-element triggers
    renderTriggerElements();

    //Begin event listeners
    startEventListeners();

});