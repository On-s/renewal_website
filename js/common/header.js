//jQuery ------------------------------
// flie name : header
//-------------------------------------
(function ($) {
    var header = $('header');
    var headBox = header.find('#headBox');
    var searchBox = $('.searchBox');
    var search_btn = $('.search_btn');



    search_btn.on('click', function (e) {
        e.preventDefault();
        console.log('click');

    })
})(jQuery);