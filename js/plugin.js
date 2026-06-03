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

    /*----------------------------------------
      SHOW Password
    ----------------------------------------*/


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


    /*----------------------------------------
      Slider
    ----------------------------------------*/

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


    // var intervalTime = 3000; // 
    // var autoPlayTimer;

    // function startAutoPlay() {
    //     autoPlayTimer = setInterval(function() {
    //         var $rows = $('.menu-row');
    //         var $activeRow = $('.menu-row.active-row');
    //         var nextIndex = $rows.index($activeRow) + 1;

    //        
    //         if (nextIndex >= $rows.length) {
    //             nextIndex = 0;
    //         }

    //         // 
    //         $rows.eq(nextIndex).click();
    //     }, intervalTime);
    // }

    // //
    // startAutoPlay();

    // // 
    // $('.menu-row, .game-card').click(function() {
    //     clearInterval(autoPlayTimer); // 
    //     startAutoPlay(); //
    // });


    /*----------------------------------------
       Slider Card Home
     ----------------------------------------*/




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
    // $('.field').on('click', '.icon-pass', function() {
    //     let parentField = $(this).closest('.field');
    //     let passInput = parentField.find('.pass-field');
    //     let eyeSlash = parentField.find('.eye-slash');
    //     let eye = parentField.find('.eye');

    //     if (passInput.attr('type') === 'password') {
    //         passInput.attr('type', 'text');
    //         eyeSlash.hide();
    //         eye.show();
    //     } else {
    //         passInput.attr('type', 'password');
    //         eye.hide();
    //         eyeSlash.show();
    //     }
    // });

    /*----------------------------------------
       Form
     ----------------------------------------*/


    $('#couponInput').on('input', function() {
        var sanitizeValue = $(this).val().replace(/[^0-9]/g, '');
        $(this).val(sanitizeValue);
        var isEmpty = $.trim($(this).val()) === "";
        $('#submitBtn').prop('disabled', isEmpty);
    });

    /*----------------------------------------
      Input Code
     ----------------------------------------*/


    $('#trigger-upload').on('click', function() {
        $('#image-uploader').click();
    });

    $('#image-uploader').on('change', function(event) {
        var file = event.target.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#profile-img').attr('src', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    $('.btn-edit').on('click', function() {
        var $row = $(this).closest('.input-row');
        var $input = $row.find('.form-control');
        $(this).hide();
        $row.find('.action-buttons').css('display', 'flex');
        $input.removeAttr('readonly').focus();
        $input.data('old-val', $input.val());
    });

    $('.btn-save').on('click', function() {
        var $row = $(this).closest('.input-row');
        var $input = $row.find('.form-control');
        var $editBtn = $row.find('.btn-edit');
        var $actionBtns = $row.find('.action-buttons');
        $input.attr('readonly', true);
        $actionBtns.hide();
        $editBtn.show();

        // console.log("تم حفظ القيمة الجديدة: " + $input.val());
    });

    $('.btn-cancel').on('click', function() {
        var $row = $(this).closest('.input-row');
        var $input = $row.find('.form-control');
        var $editBtn = $row.find('.btn-edit');
        var $actionBtns = $row.find('.action-buttons');
        $input.val($input.data('old-val'));
        $input.attr('readonly', true);
        $actionBtns.hide();
        $editBtn.show();
    });

    /*----------------------------------------
      Input trigger-upload
     ----------------------------------------*/

    let count = 10;
    const $starBg = $('#starBg');
    const $numText = $('#num');
    const countdown = setInterval(() => {
        count--;
        $numText.text(count);
        $starBg.addClass('spin-effect');
        setTimeout(() => {
            $starBg.css('transition', 'none').removeClass('spin-effect');

            setTimeout(() => {
                $starBg.css('transition', 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)');
            }, 50);
        }, 300);
        if (count === 0) {
            clearInterval(countdown);
        }
    }, 1000);


}); // END window.load