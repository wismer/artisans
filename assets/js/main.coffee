#= require "_helper"

# Add scripts to load to this array. These can be loaded remotely like jquery
# is below, or can use file paths, like 'vendor/underscore'
js = ["http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js", '/js/components/jcarousellite/jcarousellite.js']

# this will fire once the required scripts have been loaded
require js, ->
  $ ->

    getImages = (e) ->
      e.preventDefault()
      $('.nav-help').remove()
      $('.active').removeClass()
      $(@).parent().addClass('active')
      $('.picture-frame div:last').remove()
      thumb = $(@).attr('value')
      $('.shift-right, .shift-left').show()
      imageAjax thumb

    imageAjax = (tag) ->
      $.get '/gallery/images', (data) ->
        images = $(data).find(".#{tag}")
        prevImage = $(images).prev('div')
        nextImage = $(images).next('div')
        $('.shift-left').attr('value', prevImage.attr('class'))
        $('.fade-left').append(prevImage).css(
          "position": "relative"
          "top": "0"
          "right": "0"
        )
        $('.shift-right').attr('value', nextImage.attr('class'))
        $('.picture-frame').append(images)
        innerThumb $(images).find('.thumbnail-side')

    innerThumb = (image) ->
      full = image.find('a')
      full.each (index, val) ->
        $(val).mouseenter ->
          $('.picture-frame img:first').attr('src', $(val).attr('full'))
        $(val).click (e) ->
          e.preventDefault()

    displayTitle = ->
      tag = $(@).children("img").attr('src')
      offset = $(@).offset()
      $('.sub-title').html(tag)
      $('.sub-title').show().css(
        "left": offset.left - 20
      )
    hideTitle = ->  
      $(".sub-title").hide()
    $('.shift-right, .shift-left').click (e) ->
      e.preventDefault()
      image = $(@).attr('value')
      $('.picture-frame div').remove()
      $('.thumbnail-nav > img[value*="image"]').parent().css(
        "border": "1px solid rgb(255, 235, 0)"
      )
      imageAjax image

    $('.picture-frame').css(
      "background": "#000"
      "height": "900px"
      "opacity": "0.8"
    )
    $(".thumbnail-nav p").hide()
    $('.thumbnail-nav, .picture-frame').fadeIn 'slow'

    $('.thumbnail-nav a').on 
      click: getImages
      mouseenter: displayTitle
      mouseleave: hideTitle

    $('.thumbnail-nav a').jCarouselLite
      btnNext: '#next'
      btnPrev: '#prev'
      autoCSS: false
      scroll: 1

    $('.test img').click (e) ->
      e.preventDefault()
      $(@).css("border": "1px solid #ebebeb")

    $('.test a').on
      click: setBorder

    console.log $('#main-body').scrollTop()