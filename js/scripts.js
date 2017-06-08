$(document).ready(function() {
	$(document).mouseup(function (e) {
	    var container = $(".dropdown-language");
	    if (container.has(e.target).length === 0){
	        container.removeClass('open');
	    }
	});
	$(".dropdown-language-title").click(function(){

	});
});