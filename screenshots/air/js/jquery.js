jQuery( document ).ready(function() {
  jQuery('.mansorygrid').imagesLoaded( function() {
    jQuery('.mansorygrid').masonry({
//      gutter: 10,
      itemSelector: '.grid-item'
    });
  });
});
