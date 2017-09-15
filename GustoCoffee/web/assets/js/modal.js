var $ = require('jquery');

// When the user clicks the button, open the modal
    if($('#myBtn').length) {
        // Get the button that opens the modal
        var btn = $('#myBtn');
        btn.click( function () {
            $('div#myModal').show();
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

    $("body").on("click", "#myModal", function(e) {
        if ($(e.target).hasClass('modal')) {
            var hidePopup = $(e.target).attr('id');
            $('#' + hidePopup).hide();
        }
    });


    // When the user clicks anywhere outside of the modal, close it
    // window.click (function(event) {
    //     if (event.target == modal) {
    //         modal.hide();
    //     }
    // });

    function hideDiv() {
        $( '#myModal' ).hide(window.location.href + "#myModal" );

    }
