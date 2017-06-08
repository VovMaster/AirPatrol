$(document).ready(function() {
	$(document).mouseup(function (e) {
	    var container = $(".dropdown-language");
	    if (container.has(e.target).length === 0){
	        container.removeClass('open');
	    }
	});
	$(".dropdown-language-title").click(function(){
		$(this).parent().toggleClass('open');
	});
	$('.products-menu-link').hover(function(){
		$('.products-menu').show();
	});



	var intervalID;
	$('.products-menu-link').hover(
		function() {
			clearInterval(intervalID);
			$('.products-menu').show();
		}, function() {
		    closeDropdownHover();
		}
	);

	$('.products-menu').hover(
		function() {
			clearInterval(intervalID);
		}, function() {
		    closeDropdownHover();
		}
	);


	function closeDropdownHover(){
		intervalID = setInterval(function(){
			$('.products-menu').hide(); 
		}, 400);

	}

	$('.menu-mobile-top a').click(function(){
		var mobileHref = $(this).attr('href');
		$(mobileHref).show();
		return false
	});

	$('.back-menu-js').click(function(){
		$('.menu-mobile-dropdown').hide();
		return false
	});


	$('.menu-button').click(function(){
		$('html').toggleClass('menu-mobile-open');
		return false
	});


});