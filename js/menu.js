$(".menuitem .fleft").click (function () {
	if (this.open) {
		$(this).parent().animate({"width":$(this).width()},300);
		$(this).parent().children(".menudrop").animate({},300);
		$(this).parent().children(".menudrop").css({"display":"none"});
		this.open = false;
	}
	else {
		var sum=$(this).width();
		$(this).parent().children(".menudrop").each( function(){ sum += $(this).width()+4;} );
		$(this).parent().animate({"width":sum},300);
		$(this).parent().children(".menudrop").animate({"background":"black"},300,
		function () {$(this).css({"display":"block"})});
		this.open = true;
	}
})
