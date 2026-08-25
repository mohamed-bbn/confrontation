$(document).ready(function() {

    /*----------------------------------------
      GLOBAL / REUSABLE SELECTION
    ----------------------------------------*/
    const $window = $(window);
    const $header = $('.header,.site-header');
    const $scrollTopBtn = $('.scrollTopBtn');

    /*----------------------------------------
      HEADER & SCROLL FUNCTIONS
    ----------------------------------------*/
    $window.scroll(function() {
        const scrollTop = $(this).scrollTop();

        // 1. Sticky Header
        if (scrollTop > 0) {
            $header.addClass("sticky");
        } else if (scrollTop < 1) {
            $header.removeClass("sticky");
        }

        // 2. Scroll To Top Button Visibility
        if (scrollTop > 800) {
            $scrollTopBtn.addClass('show');
        } else {
            $scrollTopBtn.removeClass('show');
        }
    });

    // Scroll to Top Click Action
    $scrollTopBtn.click(function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });


    /*----------------------------------------
      NAVBAR TOGGLE (Burger Menu)
    ----------------------------------------*/
    const navbarMenu = $(".menu-actions,.site-menu");
    const overlayMenu = $(".overlay");

    $("#burger, .overlay,.menu-toggle").click(function() {
        navbarMenu.toggleClass("active");
        overlayMenu.toggleClass("active");
    });

    $('.cancel').click(function() {
        $('.menu-actions, .overlay,.site-menu').removeClass("active");
    });


    /*----------------------------------------
      ACTIVE CLASS HANDLER (Tabs & Lists)
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
      SHOW / HIDE PASSWORD
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
      SLICK SLIDER INITIALIZATION
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

    initializeSlider(".slider-pattern", {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 450, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    });

    initializeSlider(".slider-special", {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1199, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 999, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 550, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    });





    /*----------------------------------------
      SLIDER CARD HOME (Interactive Cards)
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


    /*----------------------------------------
      REGISTRATION FORM VALIDATION
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


    /*----------------------------------------
      COUPON INPUT SANITIZATION
    ----------------------------------------*/
    $('#couponInput').on('input', function() {
        var sanitizeValue = $(this).val().replace(/[^0-9]/g, '');
        $(this).val(sanitizeValue);
        var isEmpty = $.trim($(this).val()) === "";
        $('#submitBtn').prop('disabled', isEmpty);
    });


    /*----------------------------------------
      PROFILE IMAGE UPLOAD & ROW EDITING
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

    // Row Edit/Save/Cancel Actions
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
        $input.attr('readonly', true);
        $row.find('.action-buttons').hide();
        $row.find('.btn-edit').show();
    });

    $('.btn-cancel').on('click', function() {
        var $row = $(this).closest('.input-row');
        var $input = $row.find('.form-control');
        $input.val($input.data('old-val')).attr('readonly', true);
        $row.find('.action-buttons').hide();
        $row.find('.btn-edit').show();
    });


    /*----------------------------------------
      COUNTDOWN TIMER & PROGRESS BAR
    ----------------------------------------*/
    let timerInterval;
    let totalTime = 30;
    let timeLeft = totalTime * 1000;
    let isRunning = false;
    const step = 100;

    function updateTimerUI() {
        let totalTimeMs = totalTime * 1000;
        let percentage = ((totalTimeMs - timeLeft) / totalTimeMs) * 100;

        if (percentage > 100) percentage = 100;
        if (percentage < 0) percentage = 0;

        $('#progressBar').css('width', percentage + '%');
        $('#progressHandle').css('right', percentage + '%');
        let secondsToShow = Math.ceil(timeLeft / 1000);
        let seconds = secondsToShow < 10 ? '0' + secondsToShow : secondsToShow;
        $('#timerText').text(`00:${seconds}`);
    }

    function startTimer() {
        if (isRunning) return;
        isRunning = true;
        $('#playIcon').text('⏸');

        timerInterval = setInterval(function() {
            if (timeLeft > 0) {
                timeLeft -= step;
                updateTimerUI();
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                $('#playIcon').text('▶');
                timeLeft = 0;
                updateTimerUI();
            }
        }, step);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        $('#playIcon').text('▶');
    }

    $('#timeBadge').click(function() {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    });

    $('.tab-btn').click(function() {
        pauseTimer();
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        let currentPhase = $(this).data('phase');
        totalTime = parseInt($(this).data('time'));
        timeLeft = totalTime * 1000;
        $('#progressBar, #timeBadge').removeClass('bg-purple bg-green bg-red');
        if (currentPhase === 'purple') {
            $('#progressBar, #timeBadge').addClass('bg-purple');
        } else if (currentPhase === 'green') {
            $('#progressBar, #timeBadge').addClass('bg-green');
        } else if (currentPhase === 'red') {
            $('#progressBar, #timeBadge').addClass('bg-red');
        }

        updateTimerUI();
        startTimer();
    });

    updateTimerUI();
    startTimer();


    /*----------------------------------------
      GRID BOX HIDDEN TOGGLE
    ----------------------------------------*/
    $('.grid-box').on('click', function() {
        $(this).addClass('hidden-box');
    });


    /*----------------------------------------
      SORT ITEM BADGES
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
      FILTER CONTAINER W/ HORIZONTAL ARROWS
    ----------------------------------------*/
    const $container = $('.filter-container');

    if ($container.length > 0) {
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
        $window.on('resize', updateArrows);

        $('.arrow-right').click(function() {
            $container.animate({ scrollLeft: $container.scrollLeft() + 200 }, 300);
        });

        $('.arrow-left').click(function() {
            $container.animate({ scrollLeft: $container.scrollLeft() - 200 }, 300);
        });
    }

    // Filter Buttons logic
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
      TEAM CARDS SELECTION & SLOTS
    ----------------------------------------*/
    $('.card').on('click', function() {
        let $card = $(this);
        let teamId = $card.closest('.team-box').data('team');
        let cardId = $card.data('id');
        let cardHtml = $card.html();

        let cardBgColor = $card.css('background-color');
        let cardTextColor = $card.css('color');

        if ($card.hasClass('active')) return;

        let $emptySlot = $(`.cards-teams .item-team[data-team="${teamId}"] .slot:not(.filled)`).first();

        if ($emptySlot.length > 0) {
            $card.addClass('active');
            $emptySlot.addClass('filled')
                .attr('data-card-id', cardId)
                .css({
                    'background-color': cardBgColor,
                    'color': cardTextColor
                })
                .html(cardHtml + '<div class="remove-btn"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path opacity="0.4" d="M15.4423 8.00003C15.4423 3.89001 12.1105 0.558174 8.00045 0.558174C3.89043 0.558174 0.558594 3.89001 0.558594 8.00003C0.558594 12.1101 3.89043 15.4419 8.00045 15.4419C12.1105 15.4419 15.4423 12.1101 15.4423 8.00003Z" fill="white"/> <path d="M8 0C12.4183 1.61054e-08 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C1.61064e-08 3.58172 3.58172 0 8 0ZM8 1.11621C4.19823 1.11621 1.11621 4.19823 1.11621 8C1.11621 11.8018 4.19823 14.8838 8 14.8838C11.8018 14.8838 14.8838 11.8018 14.8838 8C14.8838 4.19823 11.8018 1.11621 8 1.11621ZM9.83789 5.37305C10.0558 5.15507 10.409 5.15509 10.627 5.37305C10.8449 5.591 10.8449 5.94414 10.627 6.16211L8.78906 8L10.627 9.83789C10.8447 10.0558 10.8446 10.409 10.627 10.627C10.409 10.8449 10.0549 10.8449 9.83691 10.627L8 8.79004L6.16309 10.627C5.94513 10.8449 5.59103 10.8449 5.37305 10.627C5.15535 10.409 5.15526 10.0558 5.37305 9.83789L7.21094 8L5.37305 6.16211C5.1551 5.94414 5.15509 5.591 5.37305 5.37305C5.59103 5.15509 5.94415 5.15507 6.16211 5.37305L8 7.21094L9.83789 5.37305Z" fill="red"/> </svg></div>');
        } else {
            alert("يمكنك اختيار 3 وسائل مساعدة كحد أقصى لكل فريق!");
        }
    });

    $('.cards-teams').on('click', '.remove-btn', function(e) {
        e.stopPropagation();

        let $slot = $(this).closest('.slot');
        let teamId = $slot.closest('.item-team').data('team');
        let cardId = $slot.attr('data-card-id');

        $(`.team-box[data-team="${teamId}"] .card[data-id="${cardId}"]`).removeClass('active');

        $slot.removeClass('filled')
            .removeAttr('data-card-id')
            .css({ 'background-color': '', 'color': '' })
            .html('<i class="icon"><svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.1417 0C12.9492 0 9.82836 0.946695 7.17387 2.72037C4.51937 4.49404 2.45045 7.01503 1.22872 9.96455C0.00699389 12.9141 -0.312666 16.1596 0.310166 19.2908C0.932997 22.422 2.47035 25.2982 4.72781 27.5556C6.98527 29.8131 9.86144 31.3504 12.9926 31.9733C16.1238 32.5961 19.3694 32.2764 22.3189 31.0547C25.2684 29.833 27.7894 27.7641 29.5631 25.1096C31.3367 22.4551 32.2834 19.3342 32.2834 16.1417C32.2834 11.8607 30.5828 7.75496 27.5556 4.7278C24.5285 1.70064 20.4228 0 16.1417 0ZM26.2303 17.1506C26.2303 17.4181 26.124 17.6747 25.9348 17.8639C25.7456 18.0531 25.489 18.1594 25.2214 18.1594H18.1594V25.2214C18.1594 25.489 18.0531 25.7456 17.8639 25.9348C17.6748 26.124 17.4181 26.2303 17.1506 26.2303H15.1329C14.8653 26.2303 14.6087 26.124 14.4195 25.9348C14.2303 25.7456 14.124 25.489 14.124 25.2214V18.1594H7.06201C6.79444 18.1594 6.53784 18.0531 6.34864 17.8639C6.15944 17.6747 6.05315 17.4181 6.05315 17.1506V15.1329C6.05315 14.8653 6.15944 14.6087 6.34864 14.4195C6.53784 14.2303 6.79444 14.124 7.06201 14.124H14.124V7.062C14.124 6.79443 14.2303 6.53783 14.4195 6.34863C14.6087 6.15943 14.8653 6.05314 15.1329 6.05314H17.1506C17.4181 6.05314 17.6748 6.15943 17.8639 6.34863C18.0531 6.53783 18.1594 6.79443 18.1594 7.062V14.124H25.2214C25.489 14.124 25.7456 14.2303 25.9348 14.4195C26.124 14.6087 26.2303 14.8653 26.2303 15.1329V17.1506Z" fill="#523480"/> </svg></i>');
    });


    /*----------------------------------------
       DROP MENU SELECT
     ----------------------------------------*/
    $('#menu-trigger').on('click', function(e) {
        e.stopPropagation();
        $('#main-dropdown').fadeToggle(150);
    });

    $(document).on('click', function() {
        $('#main-dropdown').fadeOut(150);
    });

    $('.dropdown-item-custom').on('click', function() {
        let $item = $(this);
        let chosenValue = $item.data('value');

        if ($item.hasClass('selected-item')) {
            return;
        }

        $item.addClass('selected-item');

        if ($('.selected-tag').length > 0) {
            $('#tags-area').append('<span class="separator-arrow"><svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4.91406 8L1.41406 4.5L4.91406 1" stroke="#6B7280" stroke-width="2" stroke-linecap="round"/> </svg></span>');
        }

        let tagHtml = `
            <div class="selected-tag" data-for-value="${chosenValue}">
                <span class="close-icon">×</span>
                <span class="tag-text">${chosenValue}</span>
                <span class="tag-arrow"><svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M6.66732 0.833333L3.75065 3.75L0.833984 0.833333" stroke="#6B7280" stroke-width="1.66667" stroke-linecap="round"/> </svg></span>
            </div>
        `;
        $('#tags-area').append(tagHtml);
    });

    $(document).on('click', '.close-icon', function() {
        let tag = $(this).closest('.selected-tag');
        let associatedValue = tag.data('for-value');

        $(`.dropdown-item-custom[data-value="${associatedValue}"]`).removeClass('selected-item');
        if (tag.next('.separator-arrow').length > 0) {
            tag.next('.separator-arrow').remove();
        } else if (tag.prev('.separator-arrow').length > 0) {
            tag.prev('.separator-arrow').remove();
        }

        tag.remove();
    });


    /*----------------------------------------
       FILTER INPUT SEARCH
     ----------------------------------------*/
    $('#searchInput').on('input search', function() {
        let filterText = $(this).val().trim().toLowerCase();
        if (filterText === "") {
            $('.card').show();
            $('.grid-container').show();
            $('#noResults').hide();
            return;
        }
        $('.grid-container').show();
        $('.card').each(function() {
            let titleText = $(this).find('.title').text().toLowerCase();
            $(this).toggle(titleText.indexOf(filterText) > -1);
        });
        if ($('.card:visible').length === 0) {
            $('.grid-container').hide();
            $('#noResults').fadeIn(200);
        } else {
            $('#noResults').hide();
        }
    });


    /*----------------------------------------
       SPLASH & TOOLS OVERLAY
     ----------------------------------------*/
    setTimeout(function() {
        $('#welcome-splash').fadeOut(1000);
    }, 1000);

    const $elements = $('.auxiliary-means, .bg-overlay, body');
    $('.btn-tools, .cancellation, .bg-overlay').on('click', function() {
        $elements.toggleClass('active');
    });


    /*----------------------------------------
      NAV SCROLL & ACCORDION ACTIVE HANDLER
    ----------------------------------------*/
    const $navLinks = $('.nav-scroll .nav-link');
    const $sections = $('.accordion-custom .innertab');

    $navLinks.on('click', function() {
        $navLinks.removeClass('active');
        $(this).addClass('active');
    });

    $window.on('scroll', function() {
        let scrollPos = $(document).scrollTop();
        $sections.each(function() {
            const currSection = $(this);
            const sectionTop = currSection.offset().top - 150;
            const sectionId = currSection.attr('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + currSection.outerHeight()) {
                $navLinks.removeClass('active');
                $navLinks.filter('[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });


    /*----------------------------------------
      COUNTDOWN TIMER (LAUNCH COUNTER)
    ----------------------------------------*/
    let duration = (47 * 86400) + (8 * 3600) + (32 * 60) + 15;
    let countdownDate = Date.now() + (duration * 1000);

    let timer = setInterval(() => {
        let distance = countdownDate - Date.now();

        if (distance < 0) {
            clearInterval(timer);
            return $(".countdown-container").html("<h2 style='color:var(--text-gold)'>تم الإطلاق الآن!</h2>");
        }

        let updateTime = (className, val) => $(className).text(String(val).padStart(2, '0'));

        updateTime(".days", Math.floor(distance / 86400000));
        updateTime(".hours", Math.floor((distance % 86400000) / 3600000));
        updateTime(".minutes", Math.floor((distance % 3600000) / 60000));
        updateTime(".seconds", Math.floor((distance % 60000) / 1000));
    }, 1000);


    /*----------------------------------------
      NEWSLETTER SUBSCRIPTION MODAL TRIGGER
    ----------------------------------------*/
    $("#submitBtn").click(() => {
        let email = $("#emailInput").val();
        if (email && email.includes('@')) {
            let myModal = new bootstrap.Modal(document.getElementById('successModal'));
            myModal.show();
            $("#emailInput").val("");
        } else {
            alert("يرجى إدخال بريد إلكتروني صحيح.");
        }
    });

    /*----------------------------------------
      NEWSLETTER SUBSCRIPTION MODAL TRIGGER
    ----------------------------------------*/

    $('.tabs-btn').on('click', function() {
        $('.tabs-btn').removeClass('active');
        $(this).addClass('active');
        const tabName = $(this).data('tab');
        $('.tabs-content').removeClass('active-content').hide();
        $('#content-' + tabName).fadeIn(300).addClass('active-content');
        $('.image-wrapper').removeClass('active-image').hide();
        $('#image-' + tabName).fadeIn(300).addClass('active-image');
    });


    /*----------------------------------------
      tabs-btn
    ----------------------------------------*/

    let videoStream = null;

    async function startCamera() {
        try {
            videoStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: "environment"
                },
                audio: false
            });

            const videoElement = document.getElementById('webcamVideo');
            videoElement.srcObject = videoStream;
        } catch (err) {
            console.error("عذراً، تعذر الوصول إلى الكاميرا:", err);
            alert("تعذر فتح الكاميرا، يرجى التأكد من إعطاء الإذن للمتصفح.");
        }
    }

    function stopCamera() {
        if (videoStream) {
            videoStream.getTracks().forEach(track => track.stop());
            videoStream = null;
        }
    }

    function openSheet() {
        $('#bottomSheet').addClass('active');
        $('#overlay').addClass('active');
        startCamera(); // 
    }

    //  
    function closeSheet() {
        $('#bottomSheet').removeClass('active');
        $('#overlay').removeClass('active');
        stopCamera(); //  
    }

    $('.openSheet').on('click', openSheet);
    $('#closeBtn, #backBtn, #overlay').on('click', closeSheet);



    /*----------------------------------------
      Filter Home
    ----------------------------------------*/


    let currentFilter = 'all';

    function filterCards() {
        let searchText = $('#search-Input').val().toLowerCase().trim();
        let visibleCount = 0;

        $('.item-card').each(function() {
            let cardCategory = $(this).data('category');
            let cardTitle = $(this).find('.title').text().toLowerCase();

            let matchesCategory = (currentFilter === 'all' || cardCategory === currentFilter);

            let matchesSearch = (cardTitle.indexOf(searchText) !== -1);

            if (matchesCategory && matchesSearch) {
                $(this).fadeIn(200);
                visibleCount++;
            } else {
                $(this).hide();
            }
        });

        if (visibleCount === 0) {
            $('#noResults').fadeIn(200);
        } else {
            $('#noResults').hide();
        }
    }

    $('#search-Input').on('keyup input', function() {
        filterCards();
    });

    $('.item-filter').on('click', function() {
        $('.item-filter').removeClass('active');
        $(this).addClass('active');

        currentFilter = $(this).data('filter');

        filterCards();
    });


    /*----------------------------------------
      Filter Home
    ----------------------------------------*/



    $('.answer-option').on('click', function() {
        $('.answer-option').removeClass('selected');
        $(this).addClass('selected');
    });

    $('.submit-btn').on('click', function() {
        var selectedAnswer = $('.answer-option.selected').text();
        if (selectedAnswer) {
            alert('تم اختيار: ' + selectedAnswer);
        } else {
            alert('يرجى اختيار إجابة أولاً!');
        }
    });


    var totalSeconds = 28 * 60;
    var timerIntervalbtn = null;

    function updateTimer() {
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;

        var formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
        var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

        $('#time-display').text(formattedMinutes + ':' + formattedSeconds);

        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            clearInterval(timerIntervalbtn);
            alert('انتهى الوقت!');
        }
    }

    if (window.quizTimer) clearInterval(window.quizTimer);
    timerIntervalbtn = setInterval(updateTimer, 1000);
    window.quizTimer = timerIntervalbtn;


    /*----------------------------------------
      Filter Home
    ----------------------------------------*/


    var wrongAttempts = 0;

    function showWrongPopup() {
        $('#popup-text-box').hide();
        $('#popup-single-img').show();
        $('#wrong-popup').css('display', 'flex').hide().fadeIn(200, function() {
            setTimeout(function() {
                $('#wrong-popup').fadeOut(200);
            }, 2000);
        });
    }

    $('input[name="answer"]').change(function() {
        var $parentCard = $(this).closest('.answer-card');

        if ($parentCard.hasClass('disabled') || $parentCard.hasClass('wrong')) return;

        $('.answer-card').not('.disabled, .wrong').removeClass('selected confirmed');
        $parentCard.addClass('selected');

        $('#initial-text, #btn-next, #btn-retry, #btn-reveal').hide();
        $('#btn-submit').fadeIn();
    });

    $('#btn-submit').click(function() {
        var $selected = $('.answer-card.selected');
        var isCorrect = $selected.data('correct');

        $(this).hide();

        if (isCorrect === true) {
            $selected.removeClass('selected').addClass('confirmed');
            $('#btnnext').css('display', 'inline-block').fadeIn();
        } else {
            wrongAttempts++;
            $selected.removeClass('selected').addClass('wrong');

            showWrongPopup();

            if (wrongAttempts < 2) {
                $('#btn-retry').fadeIn();
            } else {
                $('#btn-reveal').fadeIn();
            }
        }
    });

    $('#btn-retry').click(function() {
        var $wrongCard = $('.answer-card.wrong');

        $wrongCard.addClass('disabled')
            .find('input[type="radio"]').prop('disabled', true).prop('checked', false);

        $(this).hide();
        $('#initial-text').fadeIn();
    });

    $('#btn-reveal').click(function() {
        $('.answer-card.wrong').addClass('disabled')
            .find('input[type="radio"]').prop('disabled', true).prop('checked', false);

        var $correctCard = $('.answer-card[data-correct="true"]');
        $correctCard.addClass('confirmed')
            .find('input[type="radio"]').prop('checked', true);

        $(this).hide();
        $('#btnnext').css('display', 'inline-block').fadeIn();
    });



    // $(".btnchange").click(function() {
    //     $('#timeBadge, #progressBar')
    //         .removeClass('bg-yellow')
    //         .addClass('bg-red');

    //     $(".btnchange").hide();
    //     $("#initial-text").show();

    //     $('#initial-text .yellow')
    //         .text('الفريق الثاني')
    //         .removeClass('yellow')
    //         .addClass('red');

    //     $('.subradio .che-box .num')
    //         .addClass('red');
    //     $('#btn-retry')
    //         .removeClass('yellow')
    //         .addClass('red')
    //         .contents()
    //         .filter(function() {
    //             return this.nodeType === 3;
    //         })
    //         .first()
    //         .replaceWith('فرصة للفريق الثاني ');
    // });



    // $('#deleteBtn').click(function() {
    //     $(this).addClass("doneused");
    //     $('#modalOverlay').fadeIn(200);

    //     $('#targetItem').fadeOut(300, function() {
    //         $(this).remove();
    //     });

    //     setTimeout(function() {
    //         $('#modalOverlay').fadeOut(200);
    //     }, 2000);
    // });


    $('.deleteBtn').click(function() {
        if ($(this).hasClass("doneused")) {
            return;
        }
        $(this).addClass("doneused");
        $(this).prop('disabled', true);
        $('#modalOverlay').fadeIn(200);
        $('#targetItem').fadeOut(300, function() {
            $(this).remove();
        });
        setTimeout(function() {
            $('#modalOverlay').fadeOut(200);
        }, 2000);
    });


    /*----------------------------------------
      Filter Home
    ----------------------------------------*/
    let isSorted = false;

    function updateNumbers() {
        $("#sortable .sortable-item").each(function(index) {
            $(this).find(".index-badge").text(index + 1);
            $(this).find(".final-badge").text(index + 1);
        });
    }

    const el = document.getElementById('sortable');
    const sortableInstance = Sortable.create(el, {
        animation: 150,
        onEnd: function() {
            updateNumbers();

            if (!isSorted) {
                isSorted = true;
                $("#footer-text").hide();
                $("#btn-submit").css("display", "inline-block");
                $(".final-badge").css("display", "flex");
            }
        }
    });

    $("#btn-submit").click(function() {
        let isCorrect = true;
        let previousOrder = 0;

        $("#sortable .sortable-item").each(function() {
            let currentOrder = parseInt($(this).attr("data-order"));
            if (currentOrder < previousOrder) {
                isCorrect = false;
            }
            previousOrder = currentOrder;
        });

        if (isCorrect) {
            $(".sortable-item").addClass("correct-style");
            sortableInstance.option("disabled", true);
            $("#btn-submit").hide();
            $("#btn-nexts").css("display", "inline-block");
        } else {
            $("#error-modal").fadeIn(200).delay(1000).fadeOut(200);
            $("#btn-submit").hide();
            $("#btn-retrys").css("display", "inline-block");
        }
    });

    $("#btn-retrys").click(function() {
        $(this).hide();
        $("#btn-submit").css("display", "inline-block");
    });

    /*----------------------------------------
      Filter Home
    ----------------------------------------*/



    let activeCard = null;

    $('.card-box').click(function() {
        if ($(this).hasClass('disabled-wrong') || $(this).hasClass('correct-single')) return;

        $('.card-box').removeClass('selected-yellow');
        $(this).addClass('selected-yellow');
        activeCard = $(this);

        $('#defaultFooterText').addClass('hidden');
        $('#answerButtons').removeClass('hidden');
    });

    $('#btnWrong').click(function() {
        if (activeCard) {
            activeCard.removeClass('selected-yellow').addClass('disabled-wrong');
            $('#answerButtons').addClass('hidden');
            $('#defaultFooterText').removeClass('hidden');
            activeCard = null;
        }
    });

    $('#btnCorrect').click(function() {
        if (activeCard) {
            activeCard.removeClass('selected-yellow').addClass('correct-single');
            activeCard.find('.text-main').text('أمواج');

            $('#score1').text('100');

            $('#answerButtons').addClass('hidden');
            $('#btnNext').removeClass('hidden');
        }
    });


}); // END document.ready

if (typeof window.Sortable === 'undefined') {
    window.Sortable = function() {
        return { destroy: function() {}, option: function() {} };
    };
    window.Sortable.create = function() { return new window.Sortable(); };
}

$(document).ready(function() {

    let selectedBox = null;
    let isCorrectst = false;

    function hideAllButtons() {
        $('#btn-submit, #btn-retrd, #btn-next').hide();
    }

    hideAllButtons();

    $('.cardidentify').on('click', function() {
        if ($(this).hasClass('answered')) return;

        selectedBox = $(this);
        let cardId = selectedBox.data('id');

        let rawCorrect = selectedBox.data('correct');
        isCorrectst = (rawCorrect === true || rawCorrect === "true");

        $('#q-number').text(cardId);
        $('#main-grid').hide();
        $('#question-view').css('display', 'flex');
        $('#banner-title').text('اعرف شعار كل منتخب');
        $('#footer-text').hide();

        hideAllButtons();
        $('#btn-submit').show();

        $('#question-view').removeClass('wrong-answer');
        $('#flag-hint').removeClass('wrong-text');
    });

    $('#btn-submit').on('click', function() {

        hideAllButtons();

        if (isCorrectst) {
            $('#question-view').hide();
            $('#main-grid').show();
            $('#banner-title').text('تعرف على أعلام الدول');

            selectedBox.addClass('answered');

            $('#btn-next').show();

        } else {
            $('#question-view').addClass('wrong-answer');
            $('#flag-hint').addClass('wrong-text');
            $('#btn-retrd').show();
        }
    });

    $('#btn-retrd').on('click', function() {
        hideAllButtons();
        $('#question-view').hide();
        $('#main-grid').show();
        $('#banner-title').text('تعرف على أعلام الدول');
        $('#footer-text').show();
    });

});

/*----------------------------------------
  ABOLITION GLOBAL CLICK EVENT (Vanilla JS)
----------------------------------------*/
document.addEventListener('click', function(e) {
    var abolitionBtn = e.target.closest('.abolition');
    if (abolitionBtn) {
        e.preventDefault();
        e.stopPropagation();

        var card = abolitionBtn.closest('.game-card');
        if (card) {
            card.classList.remove('doneused');
        }
    }
});
