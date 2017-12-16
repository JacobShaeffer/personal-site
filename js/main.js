var navLinks;
var sections;

function onScroll(){
    
    var scrollTop = $(window).scrollTop();
    for(var i=0; i<sections.length; i++){
        if($(sections[i]).offset().top <= (scrollTop + ($(window).height() * 0.25))){
            navLinks.removeClass("active");
            $('a[href="#' + sections[i].id + '"]').parent().addClass("active");
        }
    }
}

function main(){
    navLinks = $("ul.nav-bar-links > li");
    sections = $("div.section");

    $(window).scroll(
        $.throttle(10, () => {
            onScroll();
        })
    );
}

$(document).ready(() => {main();});