
    function fixDiv() {
        var $cache = $('#getFixed');
        if ($(window).width() >= 991 && $(window).scrollTop() > 200) {
            $cache.css({'position': 'fixed', 'top': '275px'});
            $("#removeDiv").css({"display": "inherit"});
        }
        else {
            $cache.css({'position': 'relative', 'top': '-90px'});
            $( "#removeDiv" ).css( {"display": "none"} );
        }

        if ($(window).width() < 991 && $(window).scrollTop() > 200){
            $cache.css({'position': 'relative', 'top': '-90px'});
        }

    }
    $(window).scroll(fixDiv);
    fixDiv();

