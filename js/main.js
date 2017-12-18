var sectionTitles;

function unnammed(){
    for(var i=0; i<sectionTitles.length; i++) {
        $(sectionTitles[i]).css()
        //console.log(i + ": " + $(sectionTitles[i]).parent().offset().top);
        if($(sectionTitles[i]).parent().offset().top <= ($(window).scrollTop() + $(window).height() - 50)){
            $(sectionTitles[i]).addClass("section-title");
            $(sectionTitles[i]).removeClass("section-title-fixed");
            $(sectionTitles[i]).css({"bottom": "auto"});
        }
    }
}

function onScroll(){
    //console.log("scrollTop: " + $(window).scrollTop());
    unnammed();
}

function main(){
    console.log("running");
    sectionTitles = $(".section-title-fixed");
    sections = $(".section");

    unnammed();

    $(window).scroll(
        $.throttle(10, () => {
            onScroll();
        })
    );
}

$(document).ready(() => {main();});