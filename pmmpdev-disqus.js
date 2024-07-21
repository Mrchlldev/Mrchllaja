window.disqus_blogger_current_url = $('link[rel=canonical]').attr('href');
    window.disqus_shortname = 'pocketmine-mp'; 
    $('#ignielDisqus').on('click', function(){
    $.ajax({
        type: 'GET',
        url: '//' + disqus_shortname + '.disqus.com/blogger_item.js',
        dataType: 'script',
        cache: true
    });
    $(this).fadeOut();
    });
