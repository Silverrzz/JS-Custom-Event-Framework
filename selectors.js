document.addEventListener('DOMContentLoaded', function() {

    //COLOUR BUTTON SELECTOR

    document.querySelectorAll('.colour-selector').forEach(function(element) {
        element.querySelectorAll('.selection').forEach(function(selection) {
            selection.addEventListener('click', function(e) {
                var selections = document.querySelector('.colour-selector').querySelectorAll('.selection');
                selections.forEach(function(selection) {
                    selection.classList.remove('selected');
                });

                //Add the selection class to the element
                e.target.classList.add('selected');
                
            });

        });

    });

    registerEventFunction('clear', function(data_values) {
        document.querySelectorAll('.colour-selector').forEach(function(element) {
            if (eventTargetsMe(data_values, element)) {
                element.querySelectorAll('.selection').forEach(function(selection) {
                    var selections = document.querySelector('.colour-selector').querySelectorAll('.selection');
                    selections.forEach(function(selection) {
                        selection.classList.remove('selected');
                        
                    });
                });
                sendEvent('colour-changed', 'black');
            }
        });
    });

    //NUMBER DROPDOWN SELECTOR

    registerEventFunction('clear', function(data_values) {
        document.querySelectorAll('.number-selector').forEach(function(element) {
            if (eventTargetsMe(data_values, element)) {
                element.querySelectorAll('select').forEach(function(select) {
                    //Restore to default
                    select.value = select.options[0].value;
                });
                sendEvent('number-changed', '1');
            }
        });
    });

    //TEXT INPUT SELECTOR

    registerEventFunction('clear', function(data_values) {
        document.querySelectorAll('.text-input').forEach(function(element) {
            if (eventTargetsMe(data_values, element)) {
                element.querySelectorAll('input').forEach(function(input) {
                    input.value = '';
                });
                sendEvent('text-changed', '');
            }
        });
    });
});