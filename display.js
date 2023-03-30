document.addEventListener('DOMContentLoaded', function() {

    //Colour event
    registerEventFunction('colour-changed', function(data_values) {
        document.querySelector('.feature').style.color = data_values.join(' ');
    });

    //Number event
    registerEventFunction('number-changed', function(data_values) {
        document.querySelector('.feature').innerHTML = data_values.join(' ');
    });

    //Text event
    registerEventFunction('text-changed', function(data_values) {
        //Join the array into a string with " "
        document.querySelector('.feature-two').innerHTML = data_values.join(' ');
    });

    //Clear event
    registerEventFunction('clear', function(data_values) {
        document.querySelectorAll('.feature').forEach(function(element) {
            if (eventTargetsMe(data_values, element)) {
                element.innerHTML = '';
            }
        });

        document.querySelectorAll('.feature-two').forEach(function(element) {
            if (eventTargetsMe(data_values, element)) {
                element.innerHTML = '';
            }
        });  
    });

});