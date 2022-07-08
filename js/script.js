jQuery(document).ready(function(){

  //Mobile Menu
   let touchEventlang = 'ontouchstart' in window ? 'touchstart' : 'click';
   jQuery(".menu-item-has-children:has(ul) > a" ).after( "<span class='menu_sub'></span>" );
   jQuery(document).on(touchEventlang, '.menu_sub', function(){
       jQuery(this).toggleClass("open");
       jQuery(this).next('.sub-menu').slideToggle();
   }); 
   $('.hamburger-menu').click (function(){
       $('asds');
       $(this).toggleClass('open');
       $('html').toggleClass(' over-hidden');
       $('#menu-main-menu').slideToggle();
   });

  

   // Button
 $(function() {  
 $('.primary-btn')
   .on('mouseenter', function(e) {
     var parentOffset = $(this).offset(),
         relX = e.pageX - parentOffset.left,
         relY = e.pageY - parentOffset.top;
     $(this).find('span').css({top:relY, left:relX})
   })
   .on('mouseout', function(e) {
     var parentOffset = $(this).offset(),
         relX = e.pageX - parentOffset.left,
         relY = e.pageY - parentOffset.top;
     $(this).find('span').css({top:relY, left:relX})
   });
 $('.primary-btn').click(function(){return false});
});



   //Header  show on scroll up
   var didScroll;
   var lastScrollTop = 0;
   var delta = 5;
   var navbarHeight = $('header').outerHeight();
   $(window).scroll(function(event){
       didScroll = true;
   });
   setInterval(function() {
       if (didScroll) {
           hasScrolled();
           didScroll = false;
       }
   }, 250);
   function hasScrolled() {
       var st = $(this).scrollTop();
       if(Math.abs(lastScrollTop - st) <= delta)
           return;
       if (st > lastScrollTop && st > navbarHeight){
               // Scroll Down
               $('header').removeClass('nav-down').addClass('nav-up');
           } else {
               // Scroll Up
               if(st + $(window).height() < $(document).height()) {
                   $('header').removeClass('nav-up').addClass('nav-down');
               }
           }
           lastScrollTop = st;
       }

   // AOS animation
   AOS.init();
   
   // Lazy load
  //  $('img.lazy').lazyload({
  //      effect: "fadeIn"
  //  });
   
   // Counter
   function inVisible(element) {
 //Checking if the element is
 //visible in the viewport
 var WindowTop = $(window).scrollTop();
 var WindowBottom = WindowTop + $(window).height();
 var ElementTop = element.offset().top;
 var ElementBottom = ElementTop + element.height();
 //animating the element if it is
 //visible in the viewport
 if ((ElementBottom <= WindowBottom) && ElementTop >= WindowTop)
   animate(element);
}

function animate(element) {
 //Animating the element if not animated before
 if (!element.hasClass('ms-animated')) {
   var maxval = element.data('max');
   var html = element.html();
   element.addClass("ms-animated");
   $({
     countNum: element.html()
   }).animate({
     countNum: maxval
   }, {
     //duration 5 seconds
     duration: 5000,
     easing: 'linear',
     step: function() {
       element.html(Math.floor(this.countNum) + html);
     },
     complete: function() {
       element.html(this.countNum + html);
     }
   });
 }

}

//When the document is ready
$(function() {
 //This is triggered when the
 //user scrolls the page
 $(window).scroll(function() {
   //Checking if each items to animate are 
   //visible in the viewport
   $("h2[data-max]").each(function() {
     inVisible($(this));
   });
 })
});

   // Scroll on selected DIV, CLASS, ID
   jQuery(".go-next").click(function() {
   jQuery('html, body').animate({
   scrollTop: jQuery(".tabbing-slider,.report-block,.left-image-content").offset().top
   }, 2000);
   });

   jQuery(".ball").click(function() {
    jQuery('html, body').animate({
    scrollTop: jQuery(".top-nav").offset().top
    }, 2000);
    });
 
   jQuery(".technology").click(function() {
    jQuery('html, body').animate({
    scrollTop: jQuery(".our-technology").offset().top
    }, 2000);
    });

    jQuery(".experiences").click(function() {
      jQuery('html, body').animate({
      scrollTop: jQuery(".experiences-one").offset().top
      }, 2000);
      });

      jQuery(".contact").click(function() {
        jQuery('html, body').animate({
        scrollTop: jQuery(".contact-one").offset().top
        }, 2000);
        });
   
   // Mouse cursor
  let prim = document.querySelector ('#cursor .primary');
let seco = document.querySelector ('#cursor .secondary');
let sx, px = sx = window.innerWidth / 2;
let sy, py = sy = window.innerHeight / 2;
const base_speed = 128;

// Event listeners
// On mouse move
window.addEventListener ('mousemove', e => {
 
 // Primary position
 px = e.clientX, py = e.clientY;
 prim.style.top = `${py}px`;
 prim.style.left = `${px}px`;
 
});

// Secondary render loop
let render = (() => {
 
 // Calculates delta value
 if (!this.last) this.last = (new Date ()).getTime ();
 let delta = ((new Date ()).getTime () - this.last) / 16;
 this.last = (new Date ()).getTime ();
 
 // Base speed, position difference, 
 // direction and distance
 let dx = px - sx, dy = py - sy;
 let dir = Math.atan2 (dy, dx);
 let dis = Math.sqrt (dx*dx + dy*dy);

 // Ease-out transition
 let t = Math.min (dis / 500, 1);
 let speed = base_speed * ((t*t * (3.0 - 2.0 * t)) * .94 + .06) * delta;

 // Calculates new positions and dead zone
 sx += Math.cos (dir) * speed;
 sy += Math.sin (dir) * speed;
 if (dis <= 4) { sx = px; sy = py; }
 
 // Sets position
 seco.style.top = `${sy}px`;
 seco.style.left = `${sx}px`;
 
 // Loops around
 requestAnimationFrame (render);
 
}); render ();
   
   
   

   // Tabbing with slider
   $('.tab-link-one, .tab-link-two').slick({
       dots: false,
       infinite: false,
        arrows: true,
       speed: 300,
       slidesToShow: 2,
       slidesToScroll: 2,
       responsive: [{
               breakpoint: 1599,
               settings: {
                   
                   slidesToShow: 2,
                   slidesToScroll: 2,
               }
           },
                    {
               breakpoint: 1170,
               settings: {
                   
                   slidesToShow: 2,
                   slidesToScroll: 2,
               }
           },
                    {
               breakpoint: 1024,
               settings: {
                    
                   slidesToShow: 2,
                   slidesToScroll: 2,
               }
           },
           {
               breakpoint: 780,
               settings: {
                   slidesToShow: 1,
                   slidesToScroll: 1
               }
           },
           {
               breakpoint: 480,
               settings: {
                   slidesToShow: 1,
                   slidesToScroll: 1
               }
           }
       ]
   });
     
   //tabbed content in homepage - featured product
   $('ul.tabs li').click(function(){
       var tab_id = $(this).attr('data-tab');
   
       $('ul.tabs li').removeClass('current');
       $('.tab-content').removeClass('current');
   
       $(this).addClass('current');
       $("#"+tab_id).addClass('current');
       
       $('.tab-link-one').slick('setPosition');
       $('.tab-link-two').slick('setPosition');
   });
   if (window.location.hash.length > 0) {
       var hash_str= window.location.hash.split("#")[1];
       $('.tab-link[data-tab=' + hash_str + ']').click();
   }

// Particles-Start
/* ---- particles.js config ---- */

particlesJS('particles-js',
 
 {
   "particles": {
     "number": {
       "value": 80,
       "density": {
         "enable": true,
         "value_area": 800
       }
     },
     "color": {
       "value": "#fff"
     },
     "shape": {
       "type": "circle",
       "stroke": {
         "width": 0,
         "color": "#fff"
       },
       "polygon": {
         "nb_sides": 5
       },
       "image": {
         "src": "brain.svg",
         "width": 100,
         "height": 100
       }
     },
     "opacity": {
       "value": 0.5,
       "random": false,
       "anim": {
         "enable": false,
         "speed": 1,
         "opacity_min": 0.1,
         "sync": false
       }
     },
     "size": {
       "value": 5,
       "random": true,
       "anim": {
         "enable": false,
         "speed": 40,
         "size_min": 0.1,
         "sync": false
       }
     },
     "line_linked": {
       "enable": true,
       "distance": 220,
       "color": "#fff",
       "opacity": 0.4,
       "width": 1
     },
     "move": {
       "enable": true,
       "speed": 2,
       "direction": "none",
       "random": false,
       "straight": false,
       "out_mode": "out",
       "attract": {
         "enable": false,
         "rotateX": 600,
         "rotateY": 1200
       }
     }
   },
   "interactivity": {
     "detect_on": "canvas",
     "events": {
       "onhover": {
         "enable": true,
         "mode": "grab"
       },
       "onclick": {
         "enable": true,
         "mode": "repulse"
       },
       "resize": true
     },
     "modes": {
       "grab": {
         "distance": 400,
         "line_linked": {
           "opacity": 1
         }
       },
       "bubble": {
         "distance": 400,
         "size": 40,
         "duration": 2,
         "opacity": 8,
         "speed": 3
       },
       "repulse": {
         "distance": 200
       },
       "push": {
         "particles_nb": 4
       },
       "remove": {
         "particles_nb": 2
       }
     }
   },
   "retina_detect": true,
   "config_demo": {
     "hide_card": false,
     "background_color": "#b61924",
     "background_image": "",
     "background_position": "50% 50%",
     "background_repeat": "no-repeat",
     "background_size": "cover"
   }
 }

);







/* ---- stats.js config ---- */

var count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function() {
 stats.begin();
 stats.end();
 if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
   count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
 }
 requestAnimationFrame(update);
};
requestAnimationFrame(update);

// Particles-End

// Water ripple animation
 $('.image').ripples('show');



 $('.single-item').slick();
   


});


$(function(){
 $("#slider").slick({
   arrows: false,
   autoplay: true,
   slidesToShow:5,
 slidesToScroll:0.5,
   autoplaySpeed: 0,
   speed: 1000,
   cssEase: "linear",
   pauseOnHover: true,
  responsive: [{
         breakpoint: 1124,
         settings: {
           speed: 5000,
           slidesToShow: 4,
           slidesToScroll: 1
         }
       },
       {
          breakpoint: 700,
          settings: {
           speed: 5000,
             arrows: false,
             slidesToShow: 2,
             slidesToScroll: 1
          }
         },
          {
           breakpoint: 480,
           settings: {
             speed: 5000,
             slidesToShow: 1,
             slidesToScroll: 1
           }
         }]
   });
});

try {
 $(".automattic").ripples({
   resolution: 1080,
   perturbance: 0.01,
   interactive: false
 });
 $(".hover").ripples({
   resolution: 1080,
   perturbance: 0.01,
   interactive: true
 });
} catch (e) {
 $(".error")
   .show()
   .text(e);
}

setInterval(function() {
 var $el = $(".automattic");
 var x = Math.random() * $el.outerWidth();
 var y = Math.random() * $el.outerHeight();
 var dropRadius = 30;
 var strength = 0.04 + Math.random() * 0.04;

 $el.ripples("drop", x, y, dropRadius, strength);
}, 3000);

