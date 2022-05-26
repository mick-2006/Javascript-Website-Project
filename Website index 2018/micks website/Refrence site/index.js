//[Has Background], [Has Audio], [Contains png files], [Contains gif files]
var themeCombinedOptions = [[1, 1, 7, 0]];
//HOLDS THEME NUMBER, INJECTS FROM PARENT
var theme = "0";
var INTthemeNumber = 0;
//DISPLAY THIS PAGE ON LOAD, INJECTS FROM PARENT
var preset;
var STRINGpresetPage;
//IS MOBILE BOOLEAN, INJECTS FROM PARENT
var mobile;
var BOOLEANisMobile;
//DISPLAY THIS STRING ON LOAD, INJECTS FROM PARENT
var reply;
var STRINGpageReply;
//IS PRELOADING BOOLEAN
var BOOLEANisLoading = true;
//HOLDS THEME INTEGERS
var ARRAYtheme;
//INTERVAL FOR RANDOMIZED PRELOAD TEXT
var INTERVALpreloadText;
//INTERVAL FOR RANDOMIZED PRELOAD TEXT
var INTERVALmobileHover;
//ENABLE DIAGNOSTIC BOOLEAN
var BOOLEANdiagnosticEnabled = false;
//INT WINDOW SIZES
var winHeight, winWidth;
//MEDIA PATH
var STRINGmP = "files/media/";
//FILE PATH
var STRINGfP = "files/";
var subCount;
$(document).ready(function () {
	//INJECT ACTION AFTER READY
	INTthemeNumber = theme;
	STRINGpresetPage = preset;
	STRINGpageReply = reply;
	BOOLEANisMobile = mobile;
	ARRAYtheme = themeCombinedOptions[INTthemeNumber];

	//APPEND PRELOADER WHEN READY
	$(".preloaderContainer").append('<div class="preloaderBox"><div class="preloaderAni"></div><div class="preloaderText">Loading</div><div class="preloaderSub"></div></div>');

	//MOVE CONTENT TO WINDOW EDGES
	alignToWindow();

	//APPEND LINKED MENU COVER TO ALL MENU ITEMS
	$(".menuContainer .menuItem").append('<div class="cover"><a href="#" ><img src="' + STRINGmP + 'menuCover.png" width="100%" height="100"></a></div>');

	$(".subContainer .subItem").append('<div class="footer"><img src="' + STRINGmP + 'menuFooter.png" width="190" height="20"></div>');
	$('.subContainer .subItem').children(".title").each(function () {
		$(this).html('<img src="' + STRINGmP + 'menuTitle' + $(this).html() + '.png" width="190" height="35" alt="' + $(this).html() + '">');
	});
	$(".subContainer .subItem .sub").prepend('<div class="cover"><a href="#" ><img src="' + STRINGmP + 'subCover.png" width="180" height="32"></a></div><div class="arrow"></div>');

	$(".preloaderSub").html("Loading...");

	//APPLY BACKGROUND IMAGE, DISABLE IF MOBILE
	if ((ARRAYtheme[INTthemeNumber][0] != 0)) {
		$(".stageContainer").css('background', "url(" + STRINGfP + "theme/" + INTthemeNumber + "/bg.jpg) bottom left no-repeat");
	}

	//APPLY AUDIO, DISABLE IF MOBILE
	if ((ARRAYtheme[INTthemeNumber][1] != 0)) {
		$(".audioContainer").append('<audio class="audioTheme" id="audioTheme" loop style="width:500px; margin: 0px; position:relative; left:0px;top:0px;" controls="controls" src="' + STRINGfP + 'theme/' + INTthemeNumber + '/aud.mp3"></audio>');
	} else {
		$(".audioContainer").css('display', 'none');
	}

	//APPLY IMAGE EFFECTS, DISABLE IF MOBILE
	tempStr = "";
	for (var i = 0; i < 7; i++) {
		tempStr += '<div class="animateRanFade"><img src="' + STRINGfP + 'theme/' + INTthemeNumber + '/p' + i + '.png" width="100" height="100"></div>';
	}
	$(".stageContainer").prepend(tempStr);
	tempStr = "";
	

	//APPLY IMAGE EFFECTS, DISABLE IF MOBILE
	if ((!BOOLEANisMobile) && (ARRAYtheme[INTthemeNumber][3] != 0)) {
		//NO SUPPORTED THEMES
	}

	//MENU SUB ACTIONS
	$("#menuAbout").click(function (event) {
		MenuLoad("#panelAbout");
	});
	$("#menuSocial").click(function (event) {
		MenuLoad("#panelSocial");
	});
	$("#menuSupport").click(function (event) {
		MenuLoad("#panelSupport");
	});
	$("#menuLogin").click(function (event) {
		MenuLoad("#panelLogin");
	});
	$("#menuDonate").click(function (event) {
		window.location.href = "https://www.paypal.me/SurrealEntertainment";
	});

	//MENU MOUSEOVER ACTIONS
	$(".menuContainer .menuItem .cover").mouseover(function (event) {
		$(this).parent().stop().animate({ "top": "0px" }, 250);
		if (BOOLEANisMobile) INTERVALmobileHover = setInterval(function () { mobileHideHover() }, 2000);
	});
	$(".menuContainer .menuItem").mouseleave(function (event) {
		$(this).stop().animate({ "top": "25px" }, 300);
	});

	//MENU SUBS MOUSEOVER ACTIONS
	$(".subContainer .subItem .sub .cover").mouseover(function (event) {
		$(this).parent().stop().animate({ "left": "40px", opacity: 1 }, 250);
		$(this).parent().find(".arrow").stop().css({ "left": "-20px", opacity: 0 }).animate({ "left": "-5px", opacity: 1 }, 250);
		if (BOOLEANisMobile) INTERVALmobileHover = setInterval(function () { mobileHideHover() }, 2000);
	});
	$(".subContainer .subItem .sub .cover").mouseleave(function (event) {
		$(this).parent().stop().animate({ "left": "30px", opacity: 1 }, 300);
		$(this).parent().find(".arrow").stop().animate({ "left": "-10px", opacity: 0 }, 300);
	});
	$(".subContainer .subItem .sub .cover").click(function (event) {
		$(this).parent().parent().children().each(function (i) {
			$(this).css({ 'font-weight': 'normal', 'color': '#D7D7D7' });
		});
		$(this).parent().css({ 'font-weight': 'bolder', 'color': '#FFFFFF' });
		subClick($(this).parent().find("span").html());
	});
});

function mobileHideHover() {
	$(".subContainer .subItem .sub .cover").parent().stop().animate({ "left": "30px", opacity: 1 }, 300);
	$(".subContainer .subItem .sub .cover").parent().find(".arrow").stop().animate({ "left": "-10px", opacity: 0 }, 300);
	$(".menuContainer .menuItem").stop().animate({ "top": "25px" }, 300);
	clearInterval(INTERVALmobileHover);
}

function animateStage() {
	var waitTime = 5000 + (Math.floor(Math.random() * 50) * 50);
	$('.stageContainer').children(".animateRanFade").each(function (i) {
		var ranTF = Math.floor(Math.random() * 3);
		if (ranTF == 1) {
			$(this).delay(Math.floor(Math.random() * 30) * 50).fadeOut(2000, "linear", function (i) { $(this).css({ "top": (Math.floor(Math.random() * (winHeight - 300)) + 100) + "px", "left": (Math.floor(Math.random() * (winWidth - 400)) + 300) + "px" }) }).fadeIn(1500);
		} else if (ranTF == 2) {
			$(this).delay(Math.floor(Math.random() * 30) * 50).fadeOut(2000);
		}
	});
	setTimeout(animateStage, waitTime);
}

//DIAGNOSTIC MODE
function subClick(querySub) {
	var querySubFunc = querySub.replace(/\s+/g, '').toLowerCase();
	$(".contentContainer").fadeOut(250, "linear", function () {
		if (querySub == "Diagnostic") {
			if (BOOLEANdiagnosticEnabled) {
				$(".stageContainer").find("#togDiag").remove();
				$(document).find("div").css({ "border": "0px" });
				$(document).find("img").css({ "border": "0px" });
			} else {
				$(".stageContainer").append("<span id='togDiag'>DIAGNOSTIC MODE IS ON</span>");
				$(document).find("div").css({ "border": "solid 1px #F00" });
				$(document).find("img").css({ "border": "solid 1px #0F0" });
			};
			BOOLEANdiagnosticEnabled = !BOOLEANdiagnosticEnabled;
		};
		var ajaxGet, ajaxStatus
		$.get("files/content/" + querySubFunc + ".html", function (ajaxGet, ajaxStatus) {
			$(".contentContainer").html(ajaxGet);
			if (BOOLEANdiagnosticEnabled) $(".contentContainer").append("<br><span class='smallBright'>Diagnostics: Get Status [" + ajaxStatus + "], Page Loaded [" + querySubFunc + ".asp]</span>");
		}).fail(function () {
			$(".contentContainer").html(querySub + "<br><span class='smallBright'>PAGE NOT FOUND ['" + querySubFunc + "']</span>")
		}).always(function () {
			if (!BOOLEANisMobile) {
				$(".contentContainer").fadeIn(500);
			} else {
				$(".contentContainer").show();
			};
		});
	});
};

$(window).resize(function () {
	alignToWindow();
});

function MenuLoad(menuName){
	subCount = 0;
	$("#panelAbout").hide();
	$("#panelSocial").hide();
	$("#panelLogin").hide();
	$("#panelSupport").hide();
	
	$(menuName).show().children(".sub").each(function (i) {
		$(this).stop().css({ 'font-weight': 'normal', 'color': '#D7D7D7' }).hide().delay(i * 100).fadeIn(500); 
		subCount++;
		if (i == 0) { 
			$(this).css({ 'font-weight': 'bolder', 'color': '#FFFFFF' }); 
			subClick($(this).find("span").html()); 
		}
	});
	$(menuName+' .footer').css({ "top": "70px" }).animate({ "top": (subCount * 32 + 70) + "px" }, subCount * 110);
}


function alignToWindow() {
	//SAVE WINDOW RATIO
	if (!BOOLEANisMobile) {
		winWidth = $(window).width();
	} else {
		winWidth = 480;
	}
	winHeight = $(window).height();
	$(".menuContainer").css('top', Math.max(winHeight - $(".menuContainer").height(), 0) + "px");
	$(".stageContainer").width(winWidth).height(winHeight);
	$(".preloaderContainer").width(winWidth).height(winHeight);
	if (BOOLEANisLoading) $(".preloaderBox").css('top', winHeight / 2 + "px");
	if ((!BOOLEANisMobile) && (ARRAYtheme[INTthemeNumber][1] != 0)) $(".audioContainer").css('left', winWidth - 27 + 'px');
};

//WHEN DONE LOADING
$(window).load(function (e) {
	clearInterval(INTERVALpreloadText);
	subCount = 0;
	BOOLEANisLoading = false;
	$(".preloaderSub").html(" ");
	$(".preloaderText").html("Preloading done!");
	$(".preloaderBox").animate({ "top": "-=30px", opacity: 0 }, 1000);
	$(".preloaderContainer").delay(1000).fadeOut(1000, "linear", function () {
		MenuLoad("#panelSocial");
	});
	if ((!BOOLEANisMobile) && (ARRAYtheme[INTthemeNumber][1] == 1)) $(".audioTheme").trigger("play");
	if ((!BOOLEANisMobile) && (ARRAYtheme[INTthemeNumber][2] != 0) || (ARRAYtheme[INTthemeNumber][3] != 0)) animateStage();
});