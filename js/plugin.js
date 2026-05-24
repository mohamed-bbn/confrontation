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


    function initializeSlider(selector, options) {
        $(selector)
            .on('init', function() {
                $(this).removeClass('slick-loading').addClass('slick-loaded');
                $(".slider-loader").hide();
            })
            .slick(options);
    }

    initializeSlider(".slider-categories", {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1600, settings: { slidesToShow: 5, slidesToScroll: 1 } },
            { breakpoint: 1400, settings: { slidesToShow: 4, slidesToScroll: 1 } },
            { breakpoint: 999, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 450, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    });


    $('.menu-row').click(function() {
        var targetColor = $(this).data('target');
        $('.menu-row').removeClass('active-row');
        $(this).addClass('active-row');
        var $chosenCard = $('.game-card[data-type="' + targetColor + '"]');
        if ($chosenCard.hasClass('active')) return;
        var $currentKing = $('.game-card.active');
        var chosenCurrentLeft = $chosenCard.css('left');
        $currentKing.removeClass('active').css({
            'left': chosenCurrentLeft,
            'z-index': parseInt(chosenCurrentLeft) / 50 + 1
        });
        $chosenCard.addClass('active').css({
            'left': '200px',
            'z-index': '99'
        });
    });
    $('.game-card').click(function() {
        var cardColor = $(this).data('type');
        $('.menu-row[data-target="' + cardColor + '"]').click();
    });


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





    $('#registerForm').on('submit', function(e) {
        let isValid = true;

        let fullName = $('#fullName');
        if ($.trim(fullName.val()) === '') {
            fullName.addClass('input-error').siblings('.error-message').fadeIn();
            isValid = false;
        }
        let email = $('#email');
        if ($.trim(email.val()) === '' || !email.val().includes('@')) {
            email.addClass('input-error').siblings('.error-message').fadeIn();
            isValid = false;
        }
        let phone = $('#phone');
        if ($.trim(phone.val()) === '') {
            phone.addClass('input-error').siblings('.error-message').fadeIn();
            isValid = false;
        }
        let password = $('#password');
        if ($.trim(password.val()).length < 6) {
            password.addClass('input-error').siblings('.error-message').fadeIn();
            isValid = false;
        }
        let confirmPassword = $('#confirmPassword');
        if ($.trim(confirmPassword.val()) === '') {
            $('#confirmError').text('تأكيد كلمة المرور مطلوب.').fadeIn();
            confirmPassword.addClass('input-error');
            isValid = false;
        } else if (password.val() !== confirmPassword.val()) {
            $('#confirmError').text('كلمة المرور غير متطابقة!').fadeIn();
            confirmPassword.addClass('input-error');
            isValid = false;
        }
        if (!isValid) {
            e.preventDefault();
        }
    });
    $('.form-control').on('input', function() {
        $(this).removeClass('input-error');
        $(this).siblings('.error-message').hide();
    });
    $('.field').on('click', '.icon-pass', function() {
        let parentField = $(this).closest('.field');
        let passInput = parentField.find('.pass-field');
        let eyeSlash = parentField.find('.eye-slash');
        let eye = parentField.find('.eye');

        if (passInput.attr('type') === 'password') {
            passInput.attr('type', 'text');
            eyeSlash.hide();
            eye.show();
        } else {
            passInput.attr('type', 'password');
            eye.hide();
            eyeSlash.show();
        }
    });






}); // END window.load