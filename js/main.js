var sectionTitles;

function unnammed(){
    var windowBot = $(window).scrollTop() + $(window).height() - 50;//TODO: make the +50 dynamic to the element
    for(var i=0; i<sectionTitles.length; i++) {
        var top = $(sectionTitles[i]).parent().offset().top;
        if(top <= windowBot){
            $(sectionTitles[i]).addClass("section-title");
            $(sectionTitles[i]).removeClass("section-title-fixed");
            $(sectionTitles[i]).css({"bottom": "auto"});
        }
        else{
            $(sectionTitles[i]).addClass("section-title-fixed");
            $(sectionTitles[i]).removeClass("section-title");
            $(sectionTitles[i]).css({"bottom": ""});
        }
    }
}

function onScroll(){
    unnammed();
}

function main(){
    console.log("running");
    sectionTitles = $(".section-title");
    sections = $(".section");

    unnammed();

    $(window).scroll(
        $.throttle(10, function(){
            onScroll();
        })
    );
}

$(document).ready(function(){main();});