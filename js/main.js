var sectionTitles;
var botValues =  /*[1.393, 1.1, 0.66, 0];//[1.393, 1.1, 0.66, 0];//[1.393, 1.1, 0.44, 0];/*/[ 1.393, 0.733, 0.293, 0 ];//TODO: updates these values based on window position
var fontValues = /*[1,1,1,1];            //[1, 1, 1, 0.66];      //[1, 1, 0.66, 0.44];   /*/[ 1, 0.66, 0.44, 0.293 ];//TODO: updates these values based on window position
var bottoms =    /*[66, 52, 31, 0];      //[66, 52, 31, 0];      //[66,52,21,0];         /*/[ 66, 35, 14, 0 ];


/*var a = 110.26/1611298464;
var b = (-0.22 - 508741404.2/1611298464)/928;
var c = -130759539.2/1611298464 - 1089 * b;*/


function cssHasJavascript(){
    var base = "#section-display-text-";
    var catagories = [ "me", "projects", "education", "employment" ];
    for(var i=0; i<catagories.length; i++){
        $(base + catagories[i]).css("font-size", fontValues[i] + "em");
    }
}

function unnammed(){
    var windowBot = $(window).scrollTop() + $(window).height();//TODO: make the +50 dynamic to the element
    
    /*for(var i=0; i<fontValues.length; i++){
        var temp = fontValues[i]*windowBot/1000;
        fontValues[i] = temp > 1 ? 1 : temp;
    }
    cssHasJavascript();*/
    
    for(var i=0; i<sectionTitles.length; i++) {
        var title = sectionTitles[i];
        var top = $(title).parent().offset().top;
        var temp = parseInt($(title).css("bottom").slice(0, -2))
        bottoms[i] = temp > 0 ? temp : bottoms[i];

        var dynamicSpacing = bottoms[i] + $(title).height();
        //var spacing = 138;

        if(top <= windowBot - dynamicSpacing){// - bottom){
            if($(title).hasClass("section-title-fixed")){
                console.log(windowBot);
                $(title).addClass("section-title");
                $(title).removeClass("section-title-fixed");
                $(title).css({"bottom": "auto"});
            }
        }
        else{//if(top > windowBot - spacing){
            if($(title).hasClass("section-title")){
                $(title).addClass("section-title-fixed");
                $(title).removeClass("section-title");
                $(title).css({"bottom": botValues[i] + "em"});
            }
        }
        $(".debug"+i).text( "t: " + top + "   b: " + bottoms[i] + "   d: " + dynamicSpacing );
    }
    $(".debug").text("windowBot: " + windowBot);
}

function onScroll(){
    unnammed();
}

function main(){
    var temp = $(".outlined");
    for(var i=0; i<temp.length; i++){
        console.log($(temp).offset().top);
    }

    sectionTitles = $(".section-title");
    sections = $(".section");

    cssHasJavascript();
    unnammed();

    $(window).scroll(
        $.throttle(10, function(){
            onScroll();
        })
    );
}

$(document).ready(function(){main();});