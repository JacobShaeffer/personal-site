var sectionTitles;
var botValues = [0,0,0,0];
var fontValues = [0,0,0,0];//[ 1, 0.66, 0.44, 0.293 ];
//var bottoms = [ 66, 35, 14, 0 ];
var catagories;

function setup(){
    sectionTitles = $(".section-title");
    sections = $(".section");
    catagories = [ "me", "projects", "education", "employment" ];

    //$("#test").on('click', function() { $("HTML, BODY").animate({ scrollTop: 0 }, 500); });
    for(var i=0; i<catagories.length; i++){
        let top = $("#" + catagories[i]).offset().top;
        $('a[href="#' + catagories[i] +'"]').on('click', function(e){
            console.log("clicked");
            e.stopPropagation();
            $("HTML, BODY").animate({scrollTop: top}, 750);
        })
    }

    for(var i=0; i<sectionTitles.length; i++) {
        var title = sectionTitles[i];
        $(title).removeClass("section-title");
        $(title).addClass("section-title-fixed");
    }
}

function cssHasJavascript(){
    var base = "#section-display-text-";
    for(var i=0; i<catagories.length; i++){
        $(base + catagories[i]).css("font-size", fontValues[i] + "em");
    }
}

function unnammed(){
    var windowBot = $(window).scrollTop() + $(window).height();
    
    for(var i=0; i<sectionTitles.length; i++) {
        var title = sectionTitles[i];
        var top = $(title).parent().offset().top;

        var dynamicSpacing = (botValues[i] * 48) + $(title).height();//Fixme: Somthing wierd is going on here

        //set the fonts of the titles as the page scrolls
        var distance = top - windowBot;
        var truncated = distance > 0 ? distance : 0;
        var zeroOne = truncated * 0.85 / 3300;
        fontValues[i] = 1 - zeroOne;
        

        if(top <= windowBot - dynamicSpacing){
            if($(title).hasClass("section-title-fixed")){
                $(title).addClass("section-title");
                $(title).removeClass("section-title-fixed");
                $(title).css({"bottom": "0px"});
            }
        }
        else{
            if($(title).hasClass("section-title")){
                $(title).addClass("section-title-fixed");
                $(title).removeClass("section-title");
                $(title).css({"bottom": "1px"});
            }
        }
    }

    for(var i=0; i<sectionTitles.length; i++){
        //console.log($(sectionTitles[i]).css("bottom"));
        var title = $(sectionTitles[i]);
        if($(sectionTitles[i]).css("bottom") != "0px"){
            botValues[i] = 0;
            for(var j=3; j>i; j--){
                botValues[i] += fontValues[j];
            }
            $(sectionTitles[i]).css("bottom", botValues[i] + "em");
        }
    }
    cssHasJavascript();
}

function onScroll(){
    unnammed();
}

function main(){

    setup();
    unnammed();

    $(window).scroll(
        $.throttle(10, function(){
            onScroll();
        })
    );
}

$(document).ready(function(){main();});