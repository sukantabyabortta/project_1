jQuery(function($) {
    $(window).on("load", function() {
        $("div.loadScreen").fadeOut();
    });

    // Submenu
    $.fn.submenu = function() {
        var $self = $(this);
        $self.each(function(index, elem) {
            var hasChild = $(elem).children('ul');
            var childrenLength = $(elem).children('ul').length;
            if (childrenLength) {
                $(this).prepend('<i class="nav-drp-arw"></i>');

                //[ .nav-drp-arw css:-
                //.nav-drp-arw {  position: absolute; right: 0; top: 14px; cursor: pointer; }
                // .nav-drp-arw:after { font-size: 20px; font-weight: bold; color: #fff; content: '+'; }
                // .nav-drp-arw.current:after { background: #fff; width: 15px; height: 3px; content: ''; position: absolute; right: 0; top: 8px; } ]

            }

            // $(elem).on('click', '.nav-drp-arw', function(e) {
            //     $(this).toggleClass('current');
            //     $(this).parent('li').find('> ul').stop(true, true).slideToggle('fast');
            //     $(this).parent('li').siblings().find('ul').stop(true, true).slideUp('fast');
            //     $(this).parent('li').siblings().find('.nav-drp-arw').removeClass('current');
            //     e.stopPropagation();
            // });

            if ($('.header_nav li:has(> ul)')) {
                // $(this).find('ul').prev('a').removeAttr('href');
            }

            // If "a" link need to toggle then use this bottom code
            $(elem).on('click', ' > a', function(e) {
                const $li = $(this).parent('li');
                const $submenu = $li.find('> ul');

                // Toggle submenu
                $submenu.stop(true, true).slideToggle('fast', function() {
                    // After toggle completes, check if it's visible
                    if ($(this).is(':visible')) {
                        $li.addClass('current');
                    } else {
                        $li.removeClass('current');
                    }
                });

                // Close siblings' submenus and remove their active classes
                $li.siblings().find('ul').stop(true, true).slideUp('fast');
                $li.siblings().removeClass('current');
                $li.siblings().find('.nav-drp-arw').removeClass('active');

                e.stopPropagation();
            });

            //=========================================================
        });
    }
    $('.header_nav ul li').submenu();
    $('.header_nav ul li.current').children('ul').show();
    $('.header_nav li.current').children('.nav-drp-arw').addClass('current');

    // Document click div hide 
    $(document).mouseup(function(e) {
        if ($(e.target).closest(".header_nav").length === 0) {
            $(".header_nav ul ul").slideUp('fast');
        }
    });

    var $affectedElements = $("*");
    $affectedElements.each(function() {
        var $this = $(this);
        $this.data("orig-size", $this.css("font-size"));
    });
    var increaseCount = 0;
    var decreaseCount = 0;
    $("#increasetext").click(function() {
        if (increaseCount < 2) {
            changeFontSize(1);
            increaseCount++;
        }
        if (increaseCount === 2) {
            $(this).prop('disabled', true);
        }
    });
    $("#decreasetext").click(function() {
        if (decreaseCount < 2) {
            changeFontSize(-1);
            decreaseCount++;
        }
        if (decreaseCount === 2) {
            $(this).prop('disabled', true);
        }
    });
    $("#resettext").click(function() {
        $affectedElements.each(function() {
            var $this = $(this);
            $this.css("font-size", $this.data("orig-size"));
        });
        increaseCount = 0;
        decreaseCount = 0;
        $("#increasetext, #decreasetext").prop('disabled', false);
    });

    function changeFontSize(direction) {
        $affectedElements.each(function() {
            var $this = $(this);
            var currentSize = parseInt($this.css("font-size")) || 16; // Default font size
            var newSize = currentSize + direction;
            $this.css("font-size", newSize + "px");
        });
    };

    $("#theme_white").on("click", function(e) {
        e.preventDefault();
        $("body").removeClass("darkTheme");
        $("body").removeClass("greenTheme");
    });

    $("#theme_black").on("click", function(e) {
        e.preventDefault();
        $("body").addClass("darkTheme");
        $("body").removeClass("greenTheme");
    });

    $(".header_middle .container").prepend("<a href='#' class='page_down'>page_down</a>");
    $(".header_bottom .container").append("<a href='#' class='menu_btn'>page_down</a>");

    $('a.page_down').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('change');
        $('.header_top').toggleClass('change');
    });

    $('a.menu_btn').click(function(e) {
        e.preventDefault();
        $('.header_nav').addClass('change');
        $('.header_top').removeClass('change');
        $('a.page_down').removeClass('change');
    });

    $('a.cls_btn').click(function(e) {
        e.preventDefault();
        $('.header_nav').removeClass('change');
    });

    $(document).ready(function() {
        var myDropdowns = $(".myDropdown");

        // Onclick on a myDropdown, toggle visibility
        myDropdowns.find("dt").click(function() {
            myDropdowns.find("dd ul").hide();
            $(this).next().children().toggle();
        });

        // Clic handler for myDropdown
        myDropdowns.find("dd ul li").click(function() {
            var leSpan = $(this).parents(".myDropdown").find("dt small span");

            // Remove selected class
            $(this).parents(".myDropdown").find('dd li').each(function() {
                $(this).removeClass('selected');
            });

            // Update selected value
            leSpan.html($(this).html());

            // If back to default, remove selected class else addclass on right element
            if ($(this).hasClass('default')) {
                leSpan.removeClass('selected')
            } else {
                leSpan.addClass('selected');
                $(this).addClass('selected');
            }

            // Close myDropdown
            $(this).parents("ul").hide();
        });

        // Close all myDropdown onclick on another element
        $(document).bind('click', function(e) {
            if (!$(e.target).parents().hasClass("myDropdown")) $(".myDropdown dd ul").hide();
        });
    });

    $('.banner_slider').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        // fade: true,
        // cssEase: 'linear'
    });

    $('#activity_slider').slick({
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 740,
            settings: {
                slidesToShow: 1
            },
        }, ],
    });

    $('#news_list').slick({
        autoplay: true,
        arrows: false,
        dots: false,
        slidesToShow: 2.1,
        slidesToScroll: 1,
        initialSlide: 0,
        draggable: true,
        infinite: true,
        pauseOnHover: false,
        swipe: false,
        touchMove: true,
        vertical: true,
        verticalSwiping: true,
        verticalScrolling: true,
        speed: 1000,
        autoplaySpeed: 1000,
        useTransform: true,
        focusOnSelect: true,
        cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
        adaptiveHeight: false,
        // centerPadding: '70px',
        centerMode: true,
    });

    $('#gallery_slider1, #gallery_slider2').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        cssEase: 'linear'
    });

    $('.latest_news_slider').slick({
        dots: false,
        arrows: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1201,
                settings: {
                    slidesToShow: 3
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3
                },
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 2
                },
            },
            {
                breakpoint: 650,
                settings: {
                    slidesToShow: 1
                },
            },
        ],
    });

    $('#info_slide').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        speed: 1000,
        autoplaySpeed: 700,
        infinite: true,
        autoplay: true,
        responsive: [{
                breakpoint: 1201,
                settings: {
                    slidesToShow: 4
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 3
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2
                },
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1
                },
            },
        ],
    });

    $('.block_1 ul').slick({
        dots: false,
        arrows: false,
        // prevArrow: $('.prev'),
        // nextArrow: $('.next'),
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1201,
                settings: {
                    slidesToShow: 2
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1
                },
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1
                },
            },
        ],
    });

    $('.block_4>ul').slick({
        dots: false,
        arrows: false,
        // prevArrow: $('.prev'),
        // nextArrow: $('.next'),
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 1201,
                settings: {
                    slidesToShow: 2
                },
            },
            {
                breakpoint: 1000,
                settings: {
                    slidesToShow: 2
                },
            },
            {
                breakpoint: 980,
                settings: {
                    slidesToShow: 1
                },
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 1
                },
            },
        ],
    });

    // Equal Height JS:
    function equalHeight(selector) {
        let max = 0;
        $(selector).height('auto').each(function() {
            max = Math.max(max, $(this).height());
        }).height(max);
    }
    $(window).on('load resize', function() {
        equalHeight('.about_img img');
        equalHeight('.mandate_cont li');
        equalHeight('.directors_panel li img');
        equalHeight('.annual_report li strong');
        equalHeight('.contact_page_cont li');
        equalHeight('.block_2 li');
        equalHeight('.block_4 li > .photo_gallery');
        equalHeight('.height_1');
        equalHeight('.height_2');
        equalHeight('.quick_link_panel li');
    });


}); //End jQuery



// // Equal height:
// function setEqualImageHeight(selector) {
//     const images = $(selector);
//     let maxHeight = 0;

//     // Wait until all images are loaded
//     let total = images.length,
//         loaded = 0;
//     images.each(function() {
//         $('<img>').on('load', function() {
//             const height = $(this).height();
//             if (height > maxHeight) maxHeight = height;

//             loaded++;
//             if (loaded === total) {
//                 // Set max height to all images
//                 images.height(maxHeight);
//             }
//         }).attr('src', $(this).attr('src'));
//     });
// }

// // Usage
// $(window).on('load resize', function() {
//     setEqualImageHeight('.image-list li img');
// });