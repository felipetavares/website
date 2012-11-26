$(".menuitem").click (function () {
	if (this.open) {
		$(this).animate({"width":"50px"},300);
		$(this).children(".menudrop").animate({"width":"100%"},300);
		$(this).children(".menudrop").css({"display":"none"});
		this.open = false;
	}
	else {
		$(this).children(".menudrop").animate({"width":"100%"},0,
		function () {$(this).css({"display":"block"})});
		$(this).animate({"width":width},300);
		this.open = true;
	}
})
