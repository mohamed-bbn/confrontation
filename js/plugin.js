$(window).on("load", function() {

    $(window).scroll(function() {
        if ($(this).scrollTop() > 0) {
            $('.header').addClass("sticky");
        } else {
            if ($(this).scrollTop() < 1) {
                $('.header').removeClass("sticky");
            }
        }
    });




    /*----------------------------------------
      HEADER STICKY ON SCROLL
    ----------------------------------------*/

    $(function() {
        const navbarMenu = $(".menu-actions");
        const overlayMenu = $(".overlay");

        $("#burger, .overlay").click(function() {
            navbarMenu.toggleClass("active");
            overlayMenu.toggleClass("active");
        });
        $('.cancel').click(function() {
            $('.menu-actions,.overlay').removeClass("active");
        });
    });

    /*----------------------------------------
      NAVBAR TOGGLE (Burger Menu)
    ----------------------------------------*/



    function setActiveClass(parentSelector, childSelector) {
        $(parentSelector).on("click", childSelector, function() {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active").siblings().removeClass("active");
            }
        });
    }
    setActiveClass(".pagination", "li a");

    /*----------------------------------------
      ACTIVE CLASS HANDLER
    ----------------------------------------*/


    $(window).scroll(function() {
        if ($(this).scrollTop() > 800) {
            $('.scrollTopBtn').addClass('show');
        } else {
            $('.scrollTopBtn').removeClass('show');
        }
    });

    $('.scrollTopBtn').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });

    /*----------------------------------------
         SCROLL TO TOP BUTTON
       ----------------------------------------*/

    $(".eye.icon-pass").click(function() {
        $(this).siblings("input.pass").attr("type", "text");
        $(this).hide();
        $(this).siblings(".eye-slash.icon-pass").show();
    });

    $(".eye-slash.icon-pass").click(function() {
        $(this).siblings("input.pass").attr("type", "password");
        $(this).hide();
        $(this).siblings(".eye.icon-pass").show();
    });




}); // END window.load
