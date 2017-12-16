var sectionTitles;


function onScroll(){
    for(var i=0; i<sectionTitles.length; i++) {
        if($(sectionTitles[i]).offset().top >= $(window).scrollTop()){
            $(sectionTitles[i]).addClass("section-title").end().removeClass("section-title-fixed");
        }
    }
}

function main(){
    sectionTitles = $(".section-title-fixed");
    sections = $('section');

    $(window).scroll(
        $.throttle(10, () => {
            onScroll();
        })
    );
}

$(document).ready(() => {main();});