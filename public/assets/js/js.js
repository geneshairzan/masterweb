$.fn.hasAnyClass = function() {
    for (var i = 0; i < arguments.length; i++) {
        var classes = arguments[i].split(" ");
        for (var j = 0; j < classes.length; j++) {
            if (this.hasClass(classes[j])) {
                return true;
            }
        }
    }
    return false;
}


$(document).ready(function() {

    cur_bg = 4;

    $(".glass_form input").focusout(function() {
        $("label[for='" + $(this).attr("id") + "']").css('visibility', 'hidden');
    });
    $(".glass_form input").focusin(function() {
        $("label[for='" + $(this).attr("id") + "']").css('visibility', 'visible');
    });


    $('.change_bg').click(function(e) {


        var src1 = $('.glass_bg').attr('src');
        var path = src1.substring(0, src1.lastIndexOf('/'));
        var new_source = path + '/' + (++cur_bg) + '.jpg ';
        $('.glass_bg').attr('src', new_source);
        if (cur_bg == 15) cur_bg = 1;

    });
});

$('.gen_nav').click(function(e) {
    $('.menu_active').removeClass('menu_active');
    $(this).toggleClass('menu_active');

});


$(document).ready(function() {

    cur_css = 1;

    $('.change_variation').click(function(e) {
        var src2 = $('#css_link').attr('href');
        console.log(src2);
        var path = src2.substring(0, src2.lastIndexOf('/'));

        if (cur_css == 1) {
            var new_source = path + '/glass2.css';
            cur_css = 2;

        } else {
            var new_source = path + '/glass.css';
            cur_css = 1;

        }

        $('#css_link').attr('href', new_source);
    });
});