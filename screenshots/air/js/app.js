jQuery( document ).ready(function() {
  jQuery(".header-search").click(function() {
      jQuery('.search-header').slideToggle();
  });
});
jQuery(window).scroll(function() {
if (jQuery(this).scrollTop() > 1){
    jQuery('header').addClass("sticky");
  }
  else{
    jQuery('header').removeClass("sticky");
  }
});
