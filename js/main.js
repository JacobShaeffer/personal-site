var sectionTitles;
var botValues = [];// = [1.81, 1.47, 0.83, 0];
var fontValues = [];
var isFixed = [];
var movingTitles;

function reset(){
    sectionTitles = null;
    botValues = [];
    fontValues = [];
    isFixed = [];
    movingTitles = null;
}

function setup(){
    sectionTitles = $(".section-title-handle");
    movingTitles = $(".moving-title");

    for(var i=0; i<movingTitles.length; i++){
        let top = $(movingTitles[i]).offset().top;
        $('a[href="#mt_' + i +'"]').on('click', function(e){
            e.preventDefault();
            $("HTML, BODY").animate({scrollTop: top}, 750);
        })
    }

    for(var i=0; i<sectionTitles.length; i++) {
        var title = sectionTitles[i];
        $(title).removeClass("section-title");
        $(title).addClass("section-title-fixed");
        fontValues.push(0);
        isFixed.push(true);
        botValues.push(0);
    }
}

function cssHasJavascript(){
    var base = $(".section-display-text");
    for(var i=0; i<base.length; i++){
        $(base[i]).css("font-size", fontValues[i] + "em");
    }
}

function onScroll(){
    var windowBot = $(window).scrollTop() + $(window).height();
    var recalculate = [];
    var needsRecalulating = false;

    for(var i=0; i<sectionTitles.length; i++){
        var distance = $(sectionTitles[i]).parent().offset().top - windowBot;
        var truncated = distance > 0 ? distance : 0;
        var zeroOne = truncated * 0.85 / ($(document).height() * 3 / 4);
        fontValues[i] = 1 - zeroOne;
    }

    for(var i=0; i<sectionTitles.length; i++){
        if(isFixed[i]){
            botValues[i] = 0;
            for(var j=3; j>i; j--){
                botValues[i] += fontValues[j];
            }
            $(sectionTitles[i]).css("bottom", botValues[i] + "em");
        }
        recalculate.push(false);
    }
    
    for(var i=0; i<sectionTitles.length; i++) {
        var title = sectionTitles[i];
        var top = $(title).parent().offset().top;

        

        var dynamicSpacing = (botValues[i] * 48) + $(title).height();
        if(top <= windowBot - dynamicSpacing){
            if($(title).hasClass("section-title-fixed")){
                $(title).addClass("section-title");
                $(title).removeClass("section-title-fixed");
                $(title).css({"bottom": "0px"});
                isFixed[i] = false;
            }
        }
        else{
            if($(title).hasClass("section-title")){
                $(title).addClass("section-title-fixed");
                $(title).removeClass("section-title");
                isFixed[i] = true;
                recalculate[i] = true;
                needsRecalulating = true;
            }
        }
    }

    if(needsRecalulating){
        for(var i=0; i<recalculate.length; i++){
            if(recalculate[i]){
                botValues[i] = 0;
                for(var j=3; j>i; j--){
                    botValues[i] += fontValues[j];
                }
                $(sectionTitles[i]).css("bottom", botValues[i] + "em");
            }
        }
    }

    cssHasJavascript();
}

function main(){

    setup();
    onScroll();

    $(window).scroll(
        $.throttle(10, function(){
            onScroll();
        })
    );

    $(window).resize(
        $.throttle(1000, function(){
            reset();
            setup();
            onScroll();
        })
    );
}

$(document).ready(function(){main();});