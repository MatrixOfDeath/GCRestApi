var $ = require('jquery');

    // Get the modal
    var modal = $('div #myModal');





// When the user clicks the button, open the modal
    if($('#myBtn').length) {
        // Get the button that opens the modal
        var btn = $('#myBtn');
        btn.click( function () {
            modal.show();
           // modal.style.display = "block";
           // modal.css("display", "block");
        });
    }

// When the user clicks on <span> (x), close the modal
    if ($('.close').length) {
        // Get the <span> element that closes the modal
        var span = $('.close');
        span.click( function () {
            hideDiv();
            //updateDiv();
        });
    }



    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.hide();
        }
    }

    function hideDiv() {
        $( '#myModal' ).hide(window.location.href + "#myModal" );

    }
