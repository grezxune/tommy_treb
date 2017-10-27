$(document).ready(function() {
    $('.page-content__post-index__item').on('click', function() {
        window.location.href = $(this).attr('data-href');
    });
});