/*!###############################
#                                #
#      by Claudiu Limban         #
# http://www.teranacreative.com  #
#                                #
##################################*/




document.addEventListener("DOMContentLoaded", function() {
    'use strict';


    var offset = function(obj) {
            var top  = 0,
                left = 0;

            if(obj.offsetParent) {
                do {
                    top  += obj.offsetTop;
                    left += obj.offsetLeft;
                    obj = obj.offsetParent;
                } while (obj);
            }
            return { top: top, left: left };
        };



    /**  SCROLL EVENTS
     *
     * - when scroll in sight
     */
    var isMobile      = false,
        window_height = window.innerHeight;

    window.addEventListener('touchstart', function onFirstTouch() {
        isMobile = true;
          // we only need to know once that a human touched the screen, so we can stop listening now
        window.removeEventListener('touchstart', onFirstTouch, false);
        console.log(isMobile);
    });


    var scroll_events = (function() {
            // Reference: http://www.html5rocks.com/en/tutorials/speed/animations/
            var last_scroll_y   = 0,
                ticking         = false,

                in_view         = [],

                el              = document.querySelector('.helmet-animation-wrapper'),
                el_offset_top   = Math.floor(el.getBoundingClientRect().top),


                step            = function() {
                    if((el_offset_top < last_scroll_y + window_height)) {
                        in_view[0].go(last_scroll_y);
                    }
                    ticking = false;
                },


                onScroll        = function(e) {
                    last_scroll_y = window.scrollY;
                    // Calls rAF if it's not already been done already
                    if(!ticking) { window.requestAnimationFrame(step); }
                    // allow further rAFs to be called
                    ticking = true;
                },


                add_event       = function(element, interaction) {
                    in_view.push({
                        el:             element,
                        el_offset_top:  Math.floor(element.getBoundingClientRect().top),
                        go:             interaction
                    });
                };


            // only listen for scroll events
            window.addEventListener('scroll', onScroll, false);


            return { add: add_event };
        })();


    var helmet_el = document.querySelector('.helmet-animation-wrapper'),
        static_el_offset_top = offset(helmet_el).top,
        steps = [],
        show_fn = function(i) {
            return function() {
                helmet_el.querySelector('.step-' + i).style.opacity = 1;
                helmet_el.querySelector('.step-' + i).style.transform = 'translateX(0%)';
            };
        },
        hide_fn = function(i) {
            return function(direction) {
                helmet_el.querySelector('.step-' + i).style.opacity = 0;
                helmet_el.querySelector('.step-' + i).style.transform = direction === 'left' ? 'translateX(-5%)' : 'translateX(5%)';
            };
        };

        for(var i = 1; i <= 4; i++) {
            steps[i] = {
                show: show_fn(i),
                hide: hide_fn(i)
            };
        }

    var scroll_helmet = function(scroll_pos) {
        var custom_pos = (scroll_pos - static_el_offset_top + 100) * 1;


        if(0 < custom_pos && custom_pos < 599) {

            if(helmet_el.classList.contains('active-2')) {
                helmet_el.classList.remove('active-2');
                steps[2].hide('left');
                setTimeout(steps[1].show, 400);
            } else if(!helmet_el.classList.contains('active-1')) {
                steps[1].show();
            }
            helmet_el.classList.add('active-1');

        } else if(600 < custom_pos && custom_pos < 1199) {

            if(helmet_el.classList.contains('active-1')) {
                helmet_el.classList.remove('active-1');
                steps[1].hide('right');
                setTimeout(steps[2].show, 400);
            } else if(helmet_el.classList.contains('active-3')) {
                helmet_el.classList.remove('active-3');
                steps[3].hide('left');
                setTimeout(steps[2].show, 400);
            }
            helmet_el.classList.add('active-2');

        } else if(1200 < custom_pos && custom_pos < 1799) {

            if(helmet_el.classList.contains('active-2')) {
                helmet_el.classList.remove('active-2');
                steps[2].hide('right');
                setTimeout(steps[3].show, 400);
            } else if(helmet_el.classList.contains('active-4')) {
                helmet_el.classList.remove('active-4');
                steps[4].hide('left');
                setTimeout(steps[3].show, 400);
            }
            helmet_el.classList.add('active-3');

        } else if(1800 < custom_pos) {

            if(helmet_el.classList.contains('active-3')) {
                helmet_el.classList.remove('active-3');
                steps[3].hide('right');
                setTimeout(steps[4].show, 400);
            }
            helmet_el.classList.add('active-4');

        }


        if(isMobile) {
            if(0 < (custom_pos - 260) && (custom_pos - 260) < 2300) {
                document.querySelector('.helmet-animation').classList.add('on-mobile');
            } else {
                document.querySelector('.helmet-animation').classList.remove('on-mobile');
            }
        } else {
            if(0 < custom_pos && custom_pos < 2000) {
            jQuery(".helmet-animation").css({'top': '' + custom_pos + 'px'});
              //document.querySelector('.helmet-animation').style.top = '' + custom_pos + 'px';
            }
        }
        // Over this value we handle the HELMET ROTATION
    };


    scroll_events.add(
        document.querySelector('.helmet-animation-wrapper'),
        scroll_helmet
    );


});
