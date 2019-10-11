new universalParallax().init({
	speed: 40.0
});
alturaNoivos = $('#noivos').position().top;

$(window).on('scroll', function() {
	if($(window).scrollTop() >= alturaNoivos) {
		$('#menu').removeClass('menu-normal');
		$('#menu').addClass('menu-fixo');
		
	}
	else {
		$('#menu').removeClass('menu-fixo');
		$('#menu').addClass('menu-normal');
	}

});

$(document).ready(function () {
	$("#open-menu").click(function () {
		$("#menu-lateral").toggle();
	});
	$("#close-menu").click(function () {
		$("#menu-lateral").toggle();
	});
	$(".item-menu-lateral").click(function () {
		$("#menu-lateral").toggle();
	});
	$("a").on('click', function(event) {
		if (this.hash !== "") {
			event.preventDefault();
			var hash = this.hash;
			$('html, body').animate({
				scrollTop: $(hash).offset().top
			}, 800, function(){
				window.location.hash = hash;
			});
		}
	});
	lerRecados();
});