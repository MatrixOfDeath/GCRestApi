function fixDiv() {
    var $cache = $('#getFixed');
    if ($(window).scrollTop() > 200) {
        $cache.css({'position': 'fixed', 'top': '275px'});
        $("#removeDiv").css({"display": "inherit"});
    }
        else {
        $cache.css({'position': 'relative', 'top': '-90px'});
        $( "#removeDiv" ).css( {"display": "none"} );
    }

}
$(window).scroll(fixDiv);
fixDiv();