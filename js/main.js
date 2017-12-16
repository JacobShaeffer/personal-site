
function onScroll(){
    
}

function main(){
    $(window).scroll(
        $.throttle(10, () => {
            onScroll();
        })
    );
}

$(document).ready(() => {main();});