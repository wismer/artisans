(function() {



}).call(this);

(function() {
  var js;

  js = ["http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js", '/js/components/jcarousellite/jcarousellite.js'];

  require(js, function() {
    return $(function() {
      var displayTitle, getImages, hideTitle, imageAjax, innerThumb;
      getImages = function(e) {
        var thumb;
        e.preventDefault();
        $('.nav-help').remove();
        $('.active').removeClass();
        $(this).parent().addClass('active');
        $('.picture-frame div:last').remove();
        thumb = $(this).attr('value');
        $('.shift-right, .shift-left').show();
        return imageAjax(thumb);
      };
      imageAjax = function(tag) {
        return $.get('/gallery/images', function(data) {
          var images, nextImage, prevImage;
          images = $(data).find("." + tag);
          prevImage = $(images).prev('div');
          nextImage = $(images).next('div');
          $('.shift-left').attr('value', prevImage.attr('class'));
          $('.fade-left').append(prevImage).css({
            "position": "relative",
            "top": "0",
            "right": "0"
          });
          $('.shift-right').attr('value', nextImage.attr('class'));
          $('.picture-frame').append(images);
          return innerThumb($(images).find('.thumbnail-side'));
        });
      };
      innerThumb = function(image) {
        var full;
        full = image.find('a');
        return full.each(function(index, val) {
          $(val).mouseenter(function() {
            return $('.picture-frame img:first').attr('src', $(val).attr('full'));
          });
          return $(val).click(function(e) {
            return e.preventDefault();
          });
        });
      };
      displayTitle = function() {
        var offset, tag;
        tag = $(this).children("img").attr('src');
        offset = $(this).offset();
        $('.sub-title').html(tag);
        return $('.sub-title').show().css({
          "left": offset.left - 20
        });
      };
      hideTitle = function() {
        return $(".sub-title").hide();
      };
      $('.shift-right, .shift-left').click(function(e) {
        var image;
        e.preventDefault();
        image = $(this).attr('value');
        $('.picture-frame div').remove();
        $('.thumbnail-nav > img[value*="image"]').parent().css({
          "border": "1px solid rgb(255, 235, 0)"
        });
        return imageAjax(image);
      });
      $('.picture-frame').css({
        "background": "#000",
        "height": "900px",
        "opacity": "0.8"
      });
      $(".thumbnail-nav p").hide();
      $('.thumbnail-nav, .picture-frame').fadeIn('slow');
      $('.thumbnail-nav a').on({
        click: getImages,
        mouseenter: displayTitle,
        mouseleave: hideTitle
      });
      $('.thumbnail-nav a').jCarouselLite({
        btnNext: '#next',
        btnPrev: '#prev',
        autoCSS: false,
        scroll: 1
      });
      $('.test img').click(function(e) {
        e.preventDefault();
        return $(this).css({
          "border": "1px solid #ebebeb"
        });
      });
      $('.test a').on({
        click: setBorder
      });
      return console.log($('#main-body').scrollTop());
    });
  });

}).call(this);
