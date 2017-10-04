
console.log('readyy');
    $(".cp").keyup(function() {
        console.log('keyup');
        if ($(this).val().length === 5) {
            $.ajax({
                type: 'GET',
                url: Routing.generate('villes',{cp:  $(this).val()}),

                beforeSend: function() {
                    if ($(".loading-ville").length == 0) {
                        $("form .ville").parent().append('<div class="loading-ville"></div>');
                    }
                    $(".ville option").remove();
                },
                success: function(data) {
                    $.each(data.ville, function(index,value) {
                        $(".ville").append($('<option>',{ value : value , text: value }));
                    });
                    $(".loading-ville").remove();
                }
            });
        } else {
            $(".ville").val('');
        }
    });
