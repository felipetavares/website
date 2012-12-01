$(".menuitem").hover (
function () {
	if (!this.open) {
		var sum=$(this).children(".fleft").width();
		$(this).children(".menudrop").each( function(){ sum += $(this).width()+4;} );
		$(this).animate({"width":sum},300);
		$(this).children(".menudrop").animate({"background":"black"},300,
		function () {$(this).css({"display":"block"});$(this).parent()[0].open = true;});
	}
},
function () {
	if (this.open) {
		$(this).animate({"width":$(this).children(".fleft").width()},300);
		$(this).children(".menudrop").animate({},300);
		$(this).children(".menudrop").css({"display":"none"});
		$(this)[0].open = false;
	}
})
