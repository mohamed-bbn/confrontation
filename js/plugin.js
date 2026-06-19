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
    setActiveClass(".item-pickgame", ".item");
    setActiveClass(".itemlink", "a");

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
    const totalDuration = 10;
    const $starBg = $('#starBg');

    $('#progressBar').css('width', '0%');
    $('#progressDot').css('left', '0%');

    $('#num').text(count);

    const countdown = setInterval(function() {
        count--;

        $('#num').text(count);

        let fillPercentage = ((totalDuration - count) / totalDuration) * 100;
        $('#progressBar').css('width', fillPercentage + '%');
        $('#progressDot').css('left', fillPercentage + '%');

        $starBg.addClass('spin-effect');
        setTimeout(() => {
            $starBg.css('transition', 'none').removeClass('spin-effect');
            setTimeout(() => {
                $starBg.css('transition', 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)');
            }, 50);
        }, 300);

        $('#timerCircle').addClass('spin-effect');
        setTimeout(function() {
            $('#timerCircle').css('transition', 'none').removeClass('spin-effect');
            setTimeout(function() {
                $('#timerCircle').css('transition', 'background-color 0.3s ease');
            }, 50);
        }, 600);

        if (count <= 3) {
            $('#progressDot').addClass('danger-dot');
        }
        if (count === 0) {
            clearInterval(countdown);
        }
    }, 1000);
    /*----------------------------------------
      starBg
     ----------------------------------------*/


    // $('.team-box').each(function() {
    //     var $teamBox = $(this);

    //     $teamBox.find('.color-circle').click(function() {
    //         $teamBox.find('.color-circle').removeClass('selected');
    //         $(this).addClass('selected');
    //     });
    // });

    // $('.tag .close-btn').click(function() {
    //     $(this).parent('.tag').fadeOut(300, function() {
    //         $(this).remove();
    //         var currentTags = $('.tag').length;
    //         $('#count-num').text(currentTags);
    //     });
    // });

    // $('.start-btn').click(function() {
    //     var team1Name = $('#team1 .input-field').val().trim();
    //     var team2Name = $('#team2 .input-field').val().trim();
    //     $('.custom-alert').fadeOut(100);

    //     if (team1Name === "" || team2Name === "") {
    //         $('#error-alert').fadeIn(300).delay(3000).fadeOut(300);
    //     } else {
    //         $('#team1-span').text(team1Name);
    //         $('#team2-span').text(team2Name);
    //         $('#success-alert').fadeIn(300).delay(4000).fadeOut(300);
    //     }
    // });

    /*----------------------------------------
      Form
     ----------------------------------------*/

    $('.grid-box').on('click', function() {
        $(this).addClass('hidden-box');
    });

    /*----------------------------------------
      Form
     ----------------------------------------*/


    let nextNumber = 1;

    $('.sort-item').on('click', function() {
        let $this = $(this);

        if (!$this.hasClass('selected')) {
            $this.find('.number-badge').text(nextNumber);
            $this.addClass('selected');
            nextNumber++;

        } else {
            let removedNum = parseInt($this.find('.number-badge').text());
            $this.removeClass('selected').find('.number-badge').text('');
            $('.sort-item.selected').each(function() {
                let $badge = $(this).find('.number-badge');
                let currentNum = parseInt($badge.text());
                if (currentNum > removedNum) {
                    $badge.text(currentNum - 1);
                }
            });
            nextNumber--;
        }
    });

    /*----------------------------------------
      sort-item
     ----------------------------------------*/

    const $container = $('.filter-container');

    function updateArrows() {
        let scrollLeft = $container.scrollLeft();
        let scrollWidth = $container[0].scrollWidth;
        let width = $container.outerWidth();

        if (scrollLeft >= 0) {
            $('.arrow-right').addClass('disabled');
        } else {
            $('.arrow-right').removeClass('disabled');
        }

        if (Math.abs(scrollLeft) + width >= scrollWidth - 5) {
            $('.arrow-left').addClass('disabled');
        } else {
            $('.arrow-left').removeClass('disabled');
        }
    }

    updateArrows();
    $container.on('scroll', updateArrows);
    $(window).on('resize', updateArrows);

    $('.arrow-right').click(function() {
        $container.animate({
            scrollLeft: $container.scrollLeft() + 200
        }, 300);
    });

    $('.arrow-left').click(function() {
        $container.animate({
            scrollLeft: $container.scrollLeft() - 200
        }, 300);
    });

    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        const filterValue = $(this).attr('data-filter');

        if (filterValue == 'all') {
            $('.card').removeClass('hide');
        } else {
            $('.card').each(function() {
                if ($(this).attr('data-category') == filterValue) {
                    $(this).removeClass('hide');
                } else {
                    $(this).addClass('hide');
                }
            });
        }
    });

    /*----------------------------------------
      filter
     ----------------------------------------*/





}); // END window.load
