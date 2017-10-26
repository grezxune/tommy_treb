function toggleMenuWidth() {
    $('.menu--mobile__button')
    .next('.menu--mobile')
    .animate({ width: 'toggle' }, 350);
}

function openMenu(shouldToggleColor) {
    $('.blur-on-mobile-menu').css({
        'filter': 'blur(5px)'
    });

    $('ul.menu').css({
        'animation-duration': '0.1s'
    });

    if (shouldToggleColor) {
        $('.menu--mobile__button').css({
            'color': '#3498db'
        });
    }
}

function closeMenu(shouldToggleColor) {
    $('.blur-on-mobile-menu').css({
        'filter': 'blur(0px)'
    });

    if(shouldToggleColor) {
        $('.menu--mobile__button').css({
            'color': '#ecf0f1'
        });
    }
}

$(document).ready(function() {
    $('.menu--mobile__button').click(function () {
        var mobileMenu = $('.menu--mobile');
        var menuNotVisible = mobileMenu.css('display') === 'none';
        var shouldToggleColor = mobileMenu.parent().hasClass('menu--mobile--alt');

        toggleMenuWidth();

        if (menuNotVisible) {
            openMenu(shouldToggleColor);
        }
        else {
            closeMenu(shouldToggleColor);
        }
    });

    let timeSinceLastResize = new Date().getTime();

    $(window).resize(function() {
        var currentResize = new Date().getTime();

        if (currentResize > timeSinceLastResize + 1000) {
            var mobileMenu = $('.menu--mobile');
            var menuVisible = mobileMenu.css('display') !== 'none';
            var shouldToggleColor = mobileMenu.parent().hasClass('menu--mobile--alt');

            if (menuVisible) {
                $('.menu--mobile__button').next('.menu--mobile').animate({ width: 'toggle' }, 350);
                $('.blur-on-mobile-menu').css({
                    'filter': 'blur(0px)'
                });

                if (shouldToggleColor) {
                    $('.menu--mobile__button').css({
                        'color': '#ecf0f1'
                    });
                }
            }
        }

        timeSinceLastResize = new Date().getTime();
    });
});