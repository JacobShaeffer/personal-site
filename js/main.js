///On scroll code

var sectionTitles;
var botValues = [];// = [1.81, 1.47, 0.83, 0];
var fontValues = [];
var isFixed = [];
var movingTitles;
var backgroundImages = [];
var imageLimits = [];
var displayed = [];

function reset(){
    sectionTitles = null;
    botValues = [];
    fontValues = [];
    isFixed = [];
    imageLimits = [];
    displayed = [];

    for(var i=0; i<movingTitles.length; i++){
        let top = $(movingTitles[i]).offset().top;

        let a = $('a[href="#mt_' + i +'"]');
        a.off('click');
        a.on('click', function(e){
            e.preventDefault();
            $("HTML, BODY").animate({scrollTop: top}, 750);
        })
    }
}

function setup(){
    sectionTitles = $(".section-title-handle");
    movingTitles = $(".moving-title");

    var sections = $(".section");
    //var imageLimits = [];//section[0].height, section[0 & 1 & 2].height, 
    imageLimits.push($(sections[0]).height());
    imageLimits.push(imageLimits[0] + $(sections[1]).height() + $(sections[2]).height());
    imageLimits.push(Infinity);
    displayed = [true, false, false];

    var temp = $(".background-img");
    for(var i=0; i<temp.length; i++){
        backgroundImages.push($(temp[i]));
    }

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
    
    var scrollTop = $(window).scrollTop();

    for(var i=0; i<displayed.length; i++){
        if(displayed[i]){
            if(scrollTop >= imageLimits[i]){
                //change the displayed background image to the next one
                backgroundImages[i].removeClass("d-block");
                backgroundImages[i].addClass("d-none");
                backgroundImages[i+1].removeClass("d-none");
                backgroundImages[i+1].addClass("d-block");
                displayed[i] = false;
                displayed[i+1] = true;
            }
            else if(i > 0){
                if(scrollTop <= imageLimits[i-1]){
                    backgroundImages[i].removeClass("d-block");
                    backgroundImages[i].addClass("d-none");
                    backgroundImages[i-1].removeClass("d-none");
                    backgroundImages[i-1].addClass("d-block");
                    displayed[i] = false;
                    displayed[i-1] = true;
                }
            }
        }
    }

    var windowBot = scrollTop + $(window).height();
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

///Console simulation code

var consoleText = "";
var inputText = "";
var consoleInput;
var consoleHandle;
var consoleCursor;

function consoleSetup(){
    let cons = $("#console-text");
    cons.html(
        `
        <div id="console-text-div">
            
        </div> 
        <div id="console-input">
            <div id="console-input-text"></div>
            <div id="console-input-cursor" class="blinking-cursor">&nbsp</div>
        </div>
        `
    );
    consoleHandle = $("#console-text-div");
    consoleInput = $("#console-input-text");
    consoleCursor = $("#console-input-cursor");
}

function typeOut(index, character){
    inputText += reqres[index].content[character];
    consoleInput.html(inputText);
    if(reqres[index].content[character+1]){
        setTimeout(function(){ typeOut(index, character+1); }, 100);
    }
    else{
        inputText = "";
        consoleInput.html("");
        consoleText += "$" + reqres[index].content + "<br>";
        consoleHandle.html(consoleText);
        if(reqres[index+1]){
            setTimeout(function(){consoleSimulation(index+1);}, reqres[index].delay);
        }
    }
}

function wait(index){
    if(reqres[index].content)
        setTimeout(function(){ typeOut(index, 0); }, reqres[index].startDelay);
}

function consoleSimulation(index){
    let line = reqres[index];
    if(line.printStyle == "typed"){
        consoleCursor.css("display", "block");
        if(line.newline){
            inputText += "$";
            consoleInput.html(inputText);
        }
        wait(index);
    }
    else{
        consoleCursor.css("display", "none");
        consoleText += reqres[index].content + "<br>";
        consoleHandle.html(consoleText);
        if(reqres[index+1]){
            setTimeout(function(){consoleSimulation(index+1);}, reqres[index].delay);
        }
    }
}

///MAIN

function main(){

    setup();
    onScroll();

    consoleSetup();
    consoleSimulation(0);

    $(window).scroll(
        $.throttle(10, function(){
            onScroll();
        })
    );

    $(window).resize(
       $.throttle(100, function(){
            reset();
            setup();
            onScroll();
        })
    );
}

$(document).ready(function(){main();});

let reqres = [
    { "content": "curl jacobshaeffer.com/ >> jacobshaeffer.html",                   "printStyle": "typed", "newline": true,  "delay": 500, "startDelay": 300 },
    { "content": "status 200 after 4.056 ms content: document 12.3kb",              "printStyle": "post",  "newline": false, "delay": 400 },
    { "content": "browser -l ./jacobshaeffer.html", 				                "printStyle": "typed", "newline": true,  "delay": 700, "startDelay": 500 },
    { "content": "Parsing document",                 				                "printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /styles/style.css", 											"printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /js/main.js", 												"printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/AndroidStudio.png", 									"printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/About.png", 										    "printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/Portraits/PortraitFixedSmall.jpg", 					"printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/ft.gif", 										        "printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/Hotdog.png", 										    "printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/Tart/Edited/Small/IMG_7542.jpg", 						"printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/Tart/Edited/Small/IMG_7557.jpg", 						"printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/Tart/Edited/Small/IMG_7562.jpg", 						"printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/Tart/Edited/Small/IMG_7563.jpg", 						"printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/Tart/Edited/Small/IMG_7569.jpg", 						"printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/ASU_horizontal_name.png", 							"printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/MAG.png", 											"printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/Ti83-plus-silver.jpg", 								"printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "GET /images/TacaScreenCap.png", 							        "printStyle": "post",  "newline": false, "delay": 100 },
    { "content": "Document ready after 972 ms waiting for response", 				"printStyle": "post",  "newline": false, "delay": 300 },
    { "content": "status: Finished after 6.876 ms content: stylesheet 2.9kb", 	    "printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 2.903 ms content: script 5.5kb", 			"printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 0.599 ms content: png kb", 			    "printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 1.182 ms content: png kb", 			    "printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 0.442 ms content: png kb", 				"printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 0.324 ms content: png 7.55Mb", 			"printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 0.322 ms content: png 49.6Kb", 			"printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 0.560 ms content: jpg 63.3Kb", 			"printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 0.674 ms content: jpg 73.8Kb", 			"printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 0.567 ms content: jpg 107Kb", 				"printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 0.351 ms content: jpg 129Kb", 				"printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 0.823 ms content: jpg 104Kb", 				"printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 0.760 ms content: png 211Kb", 				"printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 0.143 ms content: png 58.8Kb", 			"printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 0.417 ms content: jpg 166Kb", 				"printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "status: Finished after 0.313 ms content: png 327Kb", 				"printStyle": "post",  "newline": false, "delay": 50  },
    { "content": "All content recieved - displaying page", 		        			"printStyle": "post",  "newline": false, "delay": 200  },
    { "content": "", 		        			                                    "printStyle": "typed", "newline": true,  "delay": 50  }
]