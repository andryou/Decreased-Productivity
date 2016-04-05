// (c) Andrew
// Icon by dunedhel: http://dunedhel.deviantart.com/
// Supporting functions by AdThwart - T. Joseph
var version = (function () {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', chrome.extension.getURL('manifest.json'), false);
	xhr.send(null);
	return JSON.parse(xhr.responseText).version;
}());
var bkg = chrome.extension.getBackgroundPage();
var error = false;
var elements = [
	"esc","tab","space","return","backspace","scroll","capslock","numlock","insert","home","del","end","pageup","pagedown",
	"left","up","right","down",
	"f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12",
	"1","2","3","4","5","6","7","8","9","0",
	"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
	"Ctrl+a","Ctrl+b","Ctrl+c","Ctrl+d","Ctrl+e","Ctrl+f","Ctrl+g","Ctrl+h","Ctrl+i","Ctrl+j","Ctrl+k","Ctrl+l","Ctrl+m",
	"Ctrl+n","Ctrl+o","Ctrl+p","Ctrl+q","Ctrl+r","Ctrl+s","Ctrl+t","Ctrl+u","Ctrl+v","Ctrl+w","Ctrl+x","Ctrl+y","Ctrl+z",
	"Shift+a","Shift+b","Shift+c","Shift+d","Shift+e","Shift+f","Shift+g","Shift+h","Shift+i","Shift+j","Shift+k","Shift+l",
	"Shift+m","Shift+n","Shift+o","Shift+p","Shift+q","Shift+r","Shift+s","Shift+t","Shift+u","Shift+v","Shift+w","Shift+x",
	"Shift+y","Shift+z",
	"Alt+a","Alt+b","Alt+c","Alt+d","Alt+e","Alt+f","Alt+g","Alt+h","Alt+i","Alt+j","Alt+k","Alt+l",
	"Alt+m","Alt+n","Alt+o","Alt+p","Alt+q","Alt+r","Alt+s","Alt+t","Alt+u","Alt+v","Alt+w","Alt+x","Alt+y","Alt+z",
	"Alt+Ctrl+a","Alt+Ctrl+b","Alt+Ctrl+c","Alt+Ctrl+d","Alt+Ctrl+e","Alt+Ctrl+f","Alt+Ctrl+g","Alt+Ctrl+h","Alt+Ctrl+i","Alt+Ctrl+j","Alt+Ctrl+k","Alt+Ctrl+l",
	"Alt+Ctrl+m","Alt+Ctrl+n","Alt+Ctrl+o","Alt+Ctrl+p","Alt+Ctrl+q","Alt+Ctrl+r","Alt+Ctrl+s","Alt+Ctrl+t","Alt+Ctrl+u","Alt+Ctrl+v","Alt+Ctrl+w","Alt+Ctrl+x","Alt+Ctrl+y","Alt+Ctrl+z",
	"Alt+Shift+a","Alt+Shift+b","Alt+Shift+c","Alt+Shift+d","Alt+Shift+e","Alt+Shift+f","Alt+Shift+g","Alt+Shift+h","Alt+Shift+i","Alt+Shift+j","Alt+Shift+k","Alt+Shift+l",
	"Alt+Shift+m","Alt+Shift+n","Alt+Shift+o","Alt+Shift+p","Alt+Shift+q","Alt+Shift+r","Alt+Shift+s","Alt+Shift+t","Alt+Shift+u","Alt+Shift+v","Alt+Shift+w","Alt+Shift+x","Alt+Shift+y","Alt+Shift+z",
	"Ctrl+Shift+a","Ctrl+Shift+b","Ctrl+Shift+c","Ctrl+Shift+d","Ctrl+Shift+e","Ctrl+Shift+f","Ctrl+Shift+g","Ctrl+Shift+h","Ctrl+Shift+i","Ctrl+Shift+j","Ctrl+Shift+k","Ctrl+Shift+l",
	"Ctrl+Shift+m","Ctrl+Shift+n","Ctrl+Shift+o","Ctrl+Shift+p","Ctrl+Shift+q","Ctrl+Shift+r","Ctrl+Shift+s","Ctrl+Shift+t","Ctrl+Shift+u","Ctrl+Shift+v","Ctrl+Shift+w","Ctrl+Shift+x","Ctrl+Shift+y","Ctrl+Shift+z",
	"Alt+Ctrl+Shift+a","Alt+Ctrl+Shift+b","Alt+Ctrl+Shift+c","Alt+Ctrl+Shift+d","Alt+Ctrl+Shift+e","Alt+Ctrl+Shift+f","Alt+Ctrl+Shift+g","Alt+Ctrl+Shift+h","Alt+Ctrl+Shift+i","Alt+Ctrl+Shift+j","Alt+Ctrl+Shift+k","Alt+Ctrl+Shift+l",
	"Alt+Ctrl+Shift+m","Alt+Ctrl+Shift+n","Alt+Ctrl+Shift+o","Alt+Ctrl+Shift+p","Alt+Ctrl+Shift+q","Alt+Ctrl+Shift+r","Alt+Ctrl+Shift+s","Alt+Ctrl+Shift+t","Alt+Ctrl+Shift+u","Alt+Ctrl+Shift+v","Alt+Ctrl+Shift+w","Alt+Ctrl+Shift+x","Alt+Ctrl+Shift+y","Alt+Ctrl+Shift+z",
	"Ctrl+esc","Ctrl+tab","Ctrl+space","Ctrl+return","Ctrl+backspace","Ctrl+scroll","Ctrl+capslock","Ctrl+numlock",
	"Ctrl+insert","Ctrl+home","Ctrl+del","Ctrl+end","Ctrl+pageup","Ctrl+pagedown","Ctrl+left","Ctrl+up","Ctrl+right",
	"Ctrl+down",
	"Ctrl+f1","Ctrl+f2","Ctrl+f3","Ctrl+f4","Ctrl+f5","Ctrl+f6","Ctrl+f7","Ctrl+f8","Ctrl+f9","Ctrl+f10","Ctrl+f11","Ctrl+f12",
	"Ctrl+1","Ctrl+2","Ctrl+3","Ctrl+4","Ctrl+5","Ctrl+6","Ctrl+7","Ctrl+8","Ctrl+9","Ctrl+0",
	"Shift+esc","Shift+tab","Shift+space","Shift+return","Shift+backspace","Shift+scroll","Shift+capslock","Shift+numlock",
	"Shift+insert","Shift+home","Shift+del","Shift+end","Shift+pageup","Shift+pagedown","Shift+left","Shift+up",
	"Shift+right","Shift+down",
	"Shift+f1","Shift+f2","Shift+f3","Shift+f4","Shift+f5","Shift+f6","Shift+f7","Shift+f8","Shift+f9","Shift+f10","Shift+f11","Shift+f12",
	"Shift+1","Shift+2","Shift+3","Shift+4","Shift+5","Shift+6","Shift+7","Shift+8","Shift+9","Shift+0",
	"Alt+esc","Alt+tab","Alt+space","Alt+return","Alt+backspace","Alt+scroll","Alt+capslock","Alt+numlock",
	"Alt+insert","Alt+home","Alt+del","Alt+end","Alt+pageup","Alt+pagedown","Alt+left","Alt+up","Alt+right","Alt+down",
	"Alt+f1","Alt+f2","Alt+f3","Alt+f4","Alt+f5","Alt+f6","Alt+f7","Alt+f8","Alt+f9","Alt+f10","Alt+f11","Alt+f12",
	"Alt+1","Alt+2","Alt+3","Alt+4","Alt+5","Alt+6","Alt+7","Alt+8","Alt+9","Alt+0",
	"Alt+Ctrl+esc","Alt+Ctrl+tab","Alt+Ctrl+space","Alt+Ctrl+return","Alt+Ctrl+backspace","Alt+Ctrl+scroll","Alt+Ctrl+capslock","Alt+Ctrl+numlock",
	"Alt+Ctrl+insert","Alt+Ctrl+home","Alt+Ctrl+del","Alt+Ctrl+end","Alt+Ctrl+pageup","Alt+Ctrl+pagedown","Alt+Ctrl+left","Alt+Ctrl+up","Alt+Ctrl+right","Alt+Ctrl+down",
	"Alt+Ctrl+f1","Alt+Ctrl+f2","Alt+Ctrl+f3","Alt+Ctrl+f4","Alt+Ctrl+f5","Alt+Ctrl+f6","Alt+Ctrl+f7","Alt+Ctrl+f8","Alt+Ctrl+f9","Alt+Ctrl+f10","Alt+Ctrl+f11","Alt+Ctrl+f12",
	"Alt+Ctrl+1","Alt+Ctrl+2","Alt+Ctrl+3","Alt+Ctrl+4","Alt+Ctrl+5","Alt+Ctrl+6","Alt+Ctrl+7","Alt+Ctrl+8","Alt+Ctrl+9","Alt+Ctrl+0",
	"Alt+Shift+esc","Alt+Shift+tab","Alt+Shift+space","Alt+Shift+return","Alt+Shift+backspace","Alt+Shift+scroll","Alt+Shift+capslock","Alt+Shift+numlock",
	"Alt+Shift+insert","Alt+Shift+home","Alt+Shift+del","Alt+Shift+end","Alt+Shift+pageup","Alt+Shift+pagedown","Alt+Shift+left","Alt+Shift+up","Alt+Shift+right","Alt+Shift+down",
	"Alt+Shift+f1","Alt+Shift+f2","Alt+Shift+f3","Alt+Shift+f4","Alt+Shift+f5","Alt+Shift+f6","Alt+Shift+f7","Alt+Shift+f8","Alt+Shift+f9","Alt+Shift+f10","Alt+Shift+f11","Alt+Shift+f12",
	"Alt+Shift+1","Alt+Shift+2","Alt+Shift+3","Alt+Shift+4","Alt+Shift+5","Alt+Shift+6","Alt+Shift+7","Alt+Shift+8","Alt+Shift+9","Alt+Shift+0",
	"Ctrl+Shift+esc","Ctrl+Shift+tab","Ctrl+Shift+space","Ctrl+Shift+return","Ctrl+Shift+backspace","Ctrl+Shift+scroll","Ctrl+Shift+capslock","Ctrl+Shift+numlock",
	"Ctrl+Shift+insert","Ctrl+Shift+home","Ctrl+Shift+del","Ctrl+Shift+end","Ctrl+Shift+pageup","Ctrl+Shift+pagedown","Ctrl+Shift+left","Ctrl+Shift+up","Ctrl+Shift+right","Ctrl+Shift+down",
	"Ctrl+Shift+f1","Ctrl+Shift+f2","Ctrl+Shift+f3","Ctrl+Shift+f4","Ctrl+Shift+f5","Ctrl+Shift+f6","Ctrl+Shift+f7","Ctrl+Shift+f8","Ctrl+Shift+f9","Ctrl+Shift+f10","Ctrl+Shift+f11","Ctrl+Shift+f12",
	"Ctrl+Shift+1","Ctrl+Shift+2","Ctrl+Shift+3","Ctrl+Shift+4","Ctrl+Shift+5","Ctrl+Shift+6","Ctrl+Shift+7","Ctrl+Shift+8","Ctrl+Shift+9","Ctrl+Shift+0",
	"Alt+Ctrl+Shift+esc","Alt+Ctrl+Shift+tab","Alt+Ctrl+Shift+space","Alt+Ctrl+Shift+return","Alt+Ctrl+Shift+backspace","Alt+Ctrl+Shift+scroll","Alt+Ctrl+Shift+capslock","Alt+Ctrl+Shift+numlock",
	"Alt+Ctrl+Shift+insert","Alt+Ctrl+Shift+home","Alt+Ctrl+Shift+del","Alt+Ctrl+Shift+end","Alt+Ctrl+Shift+pageup","Alt+Ctrl+Shift+pagedown","Alt+Ctrl+Shift+left","Alt+Ctrl+Shift+up","Alt+Ctrl+Shift+right","Alt+Ctrl+Shift+down",
	"Alt+Ctrl+Shift+f1","Alt+Ctrl+Shift+f2","Alt+Ctrl+Shift+f3","Alt+Ctrl+Shift+f4","Alt+Ctrl+Shift+f5","Alt+Ctrl+Shift+f6","Alt+Ctrl+Shift+f7","Alt+Ctrl+Shift+f8","Alt+Ctrl+Shift+f9","Alt+Ctrl+Shift+f10","Alt+Ctrl+Shift+f11","Alt+Ctrl+Shift+f12",
	"Alt+Ctrl+Shift+1","Alt+Ctrl+Shift+2","Alt+Ctrl+Shift+3","Alt+Ctrl+Shift+4","Alt+Ctrl+Shift+5","Alt+Ctrl+Shift+6","Alt+Ctrl+Shift+7","Alt+Ctrl+Shift+8","Alt+Ctrl+Shift+9","Alt+Ctrl+Shift+0",
	"`","-","=","[","]","\\",";","'",",",".","/",
	"Alt+`","Alt+-","Alt+=","Alt+[","Alt+]","Alt+\\","Alt+;","Alt+'","Alt+,","Alt+.","Alt+/",
	"Ctrl+`","Ctrl+-","Ctrl+=","Ctrl+[","Ctrl+]","Ctrl+\\","Ctrl+;","Ctrl+'","Ctrl+,","Ctrl+.","Ctrl+/",
	"Shift+`","Shift+-","Shift+=","Shift+[","Shift+]","Shift+\\","Shift+;","Shift+'","Shift+,","Shift+.","Shift+/",
	"Alt+Ctrl+`","Alt+Ctrl+-","Alt+Ctrl+=","Alt+Ctrl+[","Alt+Ctrl+]","Alt+Ctrl+\\","Alt+Ctrl+;","Alt+Ctrl+'","Alt+Ctrl+,","Alt+Ctrl+.","Alt+Ctrl+/",
	"Alt+Shift+`","Alt+Shift+-","Alt+Shift+=","Alt+Shift+[","Alt+Shift+]","Alt+Shift+\\","Alt+Shift+;","Alt+Shift+'","Alt+Shift+,","Alt+Shift+.","Alt+Shift+/",
	"Ctrl+Shift+`","Ctrl+Shift+-","Ctrl+Shift+=","Ctrl+Shift+[","Ctrl+Shift+]","Ctrl+Shift+\\","Ctrl+Shift+;","Ctrl+Shift+'","Ctrl+Shift+,","Ctrl+Shift+.","Ctrl+Shift+/",
	"Alt+Ctrl+Shift+`","Alt+Ctrl+Shift+-","Alt+Ctrl+Shift+=","Alt+Ctrl+Shift+[","Alt+Ctrl+Shift+]","Alt+Ctrl+Shift+\\","Alt+Ctrl+Shift+;","Alt+Ctrl+Shift+'","Alt+Ctrl+Shift+,","Alt+Ctrl+Shift+.","Alt+Ctrl+Shift+/"
];
document.addEventListener('DOMContentLoaded', function () {
	$("#tabs").tabs();
	$("#o1").slider({min: 0, max: 1, step: 0.05, slide: function(event, ui) { $("#opacity1").val(ui.value); opacitytest(); }, stop: function(event, ui) { saveOptions(); }});
	$("#o2").slider({min: 0, max: 1, step: 0.05, slide: function(event, ui) { $("#opacity2").val(ui.value); opacitytest(); }, stop: function(event, ui) { saveOptions(); }});
	loadOptions();
	colorPickLoad("s_bg");
	colorPickLoad("s_text");
	colorPickLoad("s_link");
	colorPickLoad("s_table");
	$(".i18_save, .i18_savecolours").click(saveOptions);
	$(".i18_revertcolours").click(revertColours);
	$(".i18_addwhitelist").click(function() { addList(0); });
	$(".i18_addblacklist").click(function() { addList(1); });
	$(".i18_dpoptions").click(function() { location.href='options.html'; });
	$(".i18_clear").click(function() {
		if ($(this).parent().find('strong').hasClass('i18_whitelist')) {
			listclear(0);
		} else {
			listclear(1);
		}
	});
	$("#enable, #enableToggle, #enableStickiness, #disableFavicons, #hidePageTitles, #showUnderline, #removeBold, #showContext, #showIcon, #showUpdateNotifications").click(saveOptions);
	$("#iconTitle").blur(saveOptions);
	$("#s_bg, #s_text, #s_link, #s_table").keyup(updateDemo);
	$("#global").click(function() {
		saveOptions();
		uncloak()
	});
	$("#opacity1").blur(function() {
		intValidate(this, 0.05);
		opacitytest();
	});
	$("#opacity2").blur(function() {
		intValidate(this, 0.5);
		opacitytest();
	});
	$("#maxwidth, #maxheight").blur(function() {
		intValidate(this);
	});
	$("#pageTitleText").blur(pageTitleValidation);
	$("#font").change(function() {
		//if ($(this).val() == '-Unchanged-') $("#fontsize").parent().parent().hide();
		//else $("#fontsize").parent().parent().show();
		updateDemo();
	});
	// Hotkey Record
	$.each(elements, function(i, e) {
	   $("#hotkey").bind('keydown', elements[i], function assets() {
			$("#hotkey").val(elements[i]).attr('disabled', 'true');
			$("#hotkeyrecord").val(chrome.i18n.getMessage("hotkey_record"));
			saveOptions();
			return false;
	   });
	});
	$("#hotkeyrecord").click(function() {
		$("#hotkeyrecord").val(chrome.i18n.getMessage("hotkey_set"));
		$("#hotkey").removeAttr('disabled').select().focus();
	});
	$("#iconType").change(function() {
		$("#sampleicon").attr('src', '../img/addressicon/'+$(this).val()+'.png');
	});
	$("#fontsize").change(fontsizeValidation);
	$("#newPages, #sfwmode, #font, #iconType").change(saveOptions);
	$("#s_preset").change(function() {
		stylePreset($(this).val());
	});
	$(".i18_close").click(closeOptions);
});
function loadCheckbox(id) {
	document.getElementById(id).checked = typeof localStorage[id] == "undefined" ? false : localStorage[id] == "true";
}

function loadElement(id) {
	$("#"+id).val(localStorage[id]);
}

function saveCheckbox(id) {
	localStorage[id] = document.getElementById(id).checked;
}

function saveElement(id) {
	localStorage[id] = $("#"+id).val();
}
function closeOptions() {
	window.open('', '_self', '');window.close();
}
function i18load() {
	$("#title").html("Decreased Productivity v"+version);
	$(".i18_default").html(chrome.i18n.getMessage("default"));
	$(".i18_enable").html(chrome.i18n.getMessage("enable"));
	$(".i18_enabled").html(chrome.i18n.getMessage("enabled"));
	$(".i18_disabled").html(chrome.i18n.getMessage("disabled"));
	$(".i18_globalmode").html(chrome.i18n.getMessage("globalmode"));
	$(".i18_globalmode2").html(chrome.i18n.getMessage("globalmode2"));
	$(".i18_globalmode3").html(chrome.i18n.getMessage("globalmode3"));
	$(".i18_cloak").html(chrome.i18n.getMessage("cloak"));
	$(".i18_uncloak").html(chrome.i18n.getMessage("uncloak"));
	$(".i18_level").html(chrome.i18n.getMessage("level"));
	$(".i18_paranoid").html(chrome.i18n.getMessage("paranoid"));
	$(".i18_sfw0").html(chrome.i18n.getMessage("sfw0"));
	$(".i18_sfw1").html(chrome.i18n.getMessage("sfw1"));
	$(".i18_sfw2").html(chrome.i18n.getMessage("sfw2"));
	$(".i18_nsfw").html(chrome.i18n.getMessage("nsfw"));
	$(".i18_toggle").html(chrome.i18n.getMessage("toggle"));
	$(".i18_toggle2").html(chrome.i18n.getMessage("toggle2"));
	$(".i18_toggle_hotkey").html(chrome.i18n.getMessage("hotkey"));
	$(".i18_hotkey_record").val(chrome.i18n.getMessage("hotkey_record"));
	$(".i18_opacity").html(chrome.i18n.getMessage("opacity"));
	$(".i18_opacity2").html(chrome.i18n.getMessage("opacity2"));
	$(".i18_unhovered").html(chrome.i18n.getMessage("unhovered"));
	$(".i18_hovered").html(chrome.i18n.getMessage("hovered"));
	$(".i18_stickiness").html(chrome.i18n.getMessage("stickiness"));
	$(".i18_stickiness2").html(chrome.i18n.getMessage("stickiness2"));
	$(".i18_favicons").html(chrome.i18n.getMessage("favicons"));
	$(".i18_hidetitles").html(chrome.i18n.getMessage("hidetitles"));
	$(".i18_showimages").html(chrome.i18n.getMessage("showimages"));
	$(".i18_showimages2").html(chrome.i18n.getMessage("showimages2"));
	$(".i18_showunderline").html(chrome.i18n.getMessage("showunderline"));
	$(".i18_removebold").html(chrome.i18n.getMessage("removebold"));
	$(".i18_showcontext").html(chrome.i18n.getMessage("showcontext"));
	$(".i18_showcontext2").html(chrome.i18n.getMessage("showcontext2"));
	$(".i18_showicon").html(chrome.i18n.getMessage("showicon"));
	$(".i18_showicon2").html(chrome.i18n.getMessage("showicon2"));
	$(".i18_showicon_type").html(chrome.i18n.getMessage("showicon_type"));
	$(".i18_showicon_type2").html(chrome.i18n.getMessage("showicon_type2"));
	$(".i18_showicon_title").html(chrome.i18n.getMessage("showicon_title"));
	$(".i18_showupdate").html(chrome.i18n.getMessage("showupdate"));
	$(".i18_showupdate2").html(chrome.i18n.getMessage("showupdate2"));
	$(".i18_font").html(chrome.i18n.getMessage("font"));
	$(".i18_customfont").html(chrome.i18n.getMessage("customfont"));
	$(".i18_fontsize").html(chrome.i18n.getMessage("fontsize"));
	$(".i18_color").html(chrome.i18n.getMessage("color"));
	$(".i18_colorpresets").html(chrome.i18n.getMessage("colorpresets"));
	$(".i18_colorpresetselect").html('-- '+chrome.i18n.getMessage("colorpresetselect")+' --');
	$(".i18_colorbackground").html(chrome.i18n.getMessage("colorbackground"));
	$(".i18_colortext").html(chrome.i18n.getMessage("colortext"));
	$(".i18_colorlink").html(chrome.i18n.getMessage("colorlink"));
	$(".i18_colortable").html(chrome.i18n.getMessage("colortable"));
	$(".i18_c1").html(chrome.i18n.getMessage("white")+' - '+chrome.i18n.getMessage("blue"));
	$(".i18_c2").html(chrome.i18n.getMessage("white")+' - '+chrome.i18n.getMessage("gray"));
	$(".i18_c3").html(chrome.i18n.getMessage("gray")+' - '+chrome.i18n.getMessage("blue"));
	$(".i18_c4").html(chrome.i18n.getMessage("lightred")+' - '+chrome.i18n.getMessage("paleblue"));
	$(".i18_c5").html(chrome.i18n.getMessage("darkbrown")+' - '+chrome.i18n.getMessage("offwhite"));
	$(".i18_c6").html(chrome.i18n.getMessage("black")+' - '+chrome.i18n.getMessage("blue"));
	$(".i18_c7").html(chrome.i18n.getMessage("black")+' - '+chrome.i18n.getMessage("green"));
	$(".i18_c8").html(chrome.i18n.getMessage("black")+' - '+chrome.i18n.getMessage("red"));
	$(".i18_c9").html(chrome.i18n.getMessage("black")+' - '+chrome.i18n.getMessage("pink"));
	$(".i18_c10").html(chrome.i18n.getMessage("white")+' - '+chrome.i18n.getMessage("green"));
	$(".i18_demo").html(chrome.i18n.getMessage("demo"));
	$(".i18_test1").html(chrome.i18n.getMessage("test1"));
	$(".i18_test2").html(chrome.i18n.getMessage("test2"));
	$(".i18_savecolours").val(chrome.i18n.getMessage("savecolours"));
	$(".i18_revertcolours").val(chrome.i18n.getMessage("revertcolours"));
	$(".i18_domain").html(chrome.i18n.getMessage("domain"));
	$(".i18_addwhitelist").val("+ "+chrome.i18n.getMessage("whitelist"));
	$(".i18_addblacklist").val("+ "+chrome.i18n.getMessage("blacklist"));
	$(".i18_whitelist").html(chrome.i18n.getMessage("whitelist"));
	$(".i18_blacklist").html(chrome.i18n.getMessage("blacklist"));
	$(".i18_clear").html(chrome.i18n.getMessage("clear"));
	$(".i18_save").val(chrome.i18n.getMessage("save"));
	$(".i18_close").val(chrome.i18n.getMessage("close"));
	$(".i18_people").html(chrome.i18n.getMessage("people"));
	$(".i18_translators").html(chrome.i18n.getMessage("translators"));
	$(".i18_help").html(chrome.i18n.getMessage("help"));
	$(".i18_support").html(chrome.i18n.getMessage("support"));
	$(".i18_supportimg").attr({alt: chrome.i18n.getMessage("support"), title:  chrome.i18n.getMessage("support")});
}
function loadOptions() {
	document.title = chrome.i18n.getMessage("dpoptions");
	i18load();
	loadCheckbox("enable");
	loadCheckbox("global");
	loadCheckbox("enableToggle");
	loadElement("hotkey");
	loadElement("newPages");
	loadElement("sfwmode");
	loadElement("opacity1");
	loadElement("opacity2");
	loadCheckbox("showIcon");
	loadElement("iconType");
	loadElement("iconTitle");
	loadCheckbox("disableFavicons");
	loadCheckbox("hidePageTitles");
	loadElement("pageTitleText");
	loadElement("maxwidth");
	loadElement("maxheight");
	loadCheckbox("enableStickiness");
	loadCheckbox("showContext");
	loadCheckbox("showUnderline");
	loadCheckbox("removeBold");
	loadCheckbox("showUpdateNotifications");
	loadElement("font");
	loadElement("customfont");
	loadElement("fontsize");
	loadElement("s_text");
	loadElement("s_bg");
	loadElement("s_table");
	loadElement("s_link");
	if ($('#global').is(':checked')) $("#newPagesRow").css('display', 'none');
	if ($('#showIcon').is(':checked')) $(".discreeticonrow").show();
	if ($('#enableToggle').is(':checked')) $("#hotkeyrow").show();
	$("#sampleicon").attr('src', '../img/addressicon/'+$('#iconType').val()+'.png');
	if (!$('#hidePageTitles').is(':checked')) $("#pageTitle").css('display', 'none');
	if ($('#sfwmode').val() == 'SFW' || $('#sfwmode').val() == 'SFW1' || $('#sfwmode').val() == 'SFW2') $("#opacityrow").show();
	if ($('#font').val() == '-Custom-') {
		if ($("#customfont").val()) $("#customfontrow").show();
		else {
			$('#font').val('Arial');
			$("#customfontrow").hide();
		}
	}
	listUpdate();
	opacitytest();
	updateDemo();
}
function isValidColor(hex) { 
	var strPattern = /^[0-9a-f]{3,6}$/i; 
	return strPattern.test(hex); 
}

function saveOptions() {
	updateDemo();
	if (!$('#enable').is(':checked') && !$('#global').is(':checked')) {
		$('#enable').prop('checked', true);
	}
	if ($('#global').is(':checked')) $("#newPagesRow").css('display', 'none');
	else $("#newPagesRow").css('display', 'block');
	if ($('#enableToggle').is(':checked')) $("#hotkeyrow").show();
	else $("#hotkeyrow").hide();
	if ($('#hidePageTitles').is(':checked')) $("#pageTitle").css('display', 'block');
	else $("#pageTitle").css('display', 'none');
	if ($('#sfwmode').val() == 'SFW' || $('#sfwmode').val() == 'SFW1' || $('#sfwmode').val() == 'SFW2') $("#opacityrow").fadeIn("fast");
	else $("#opacityrow").hide();
	if ($('#font').val() == '-Custom-') $("#customfontrow").show();
	else $("#customfontrow").hide();
	if (!$("#hotkey").val()) $("#hotkey").val('CTRL+F12');
	saveCheckbox("enable");
	saveCheckbox("global");
	saveCheckbox("enableToggle");
	saveElement("hotkey");
	saveElement("opacity1");
	saveElement("opacity2");
	saveElement("newPages");
	saveElement("sfwmode");
	saveCheckbox("showIcon");
	saveElement("iconType");
	saveElement("iconTitle");
	saveCheckbox("disableFavicons");
	saveCheckbox("hidePageTitles");
	saveElement("pageTitleText");
	saveElement("maxwidth");
	saveElement("maxheight");
	saveCheckbox("enableStickiness");
	saveCheckbox("showContext");
	saveCheckbox("showUnderline");
	saveCheckbox("removeBold");
	saveCheckbox("showUpdateNotifications");
	saveElement("font");
	saveElement("customfont");
	saveElement("fontsize");
	if ($('#showIcon').is(':checked')) {
		$(".discreeticonrow").show();
		bkg.setDPIcon();
	} else $(".discreeticonrow").hide();
	if (isValidColor($('#s_text').val()) && isValidColor($('#s_bg').val()) && isValidColor($('#s_table').val()) && isValidColor($('#s_link').val())) {
		saveElement("s_text");
		saveElement("s_bg");
		saveElement("s_table");
		saveElement("s_link");
	} else {
		error = true;
	}
	// Apply new settings
	bkg.recursiveCloak(localStorage["enable"], localStorage["global"], localStorage["showIcon"]);
	// Remove any existing styling
	if (!error) notification(chrome.i18n.getMessage("saved"));
	else notification(chrome.i18n.getMessage("invalidcolour"));
}

function opacitytest() {
	$("#o1").slider("option", "value", $("#opacity1").val());
	$("#o2").slider("option", "value", $("#opacity2").val());
	$(".sampleimage").css({"opacity": $("#opacity1").val()});
	$(".sampleimage").hover(
		function () {
			$(this).css("opacity", $("#opacity2").val());
		}, 
		function () {
			$(this).css("opacity", $("#opacity1").val());
		}
	);
}	

function intValidate(elm, val) {
	if (!is_int(elm.value)) {
		notification(chrome.i18n.getMessage("invalidnumber"));
		elm.value = val;
	}
	else saveOptions();
}

function is_int(value){ 
	if(value != '' && !isNaN(value)) return true;
	else return false;
}	

function pageTitleValidation() {
	if ($.trim($("#pageTitleText").val()) == '') $("#pageTitleText").val('Google Chrome');
	else saveOptions();
}

function fontsizeValidation() {
	if (!is_int($.trim($("#fontsize").val()))) $("#fontsize").val('12');
	updateDemo();
}

function notification(msg) {
	$('.message').html(msg).stop().fadeIn("slow").delay(2000).fadeOut("slow")
}
function truncText(str) {
	if (str.length > 16) return str.substr(0, 16)+'...';
	return str;
}
function updateDemo() {
	if ($('#disableFavicons').is(':checked')) $("#demo_favicon").attr('style','visibility: hidden');
	else $("#demo_favicon").removeAttr('style');
	if ($('#hidePageTitles').is(':checked')) $("#demo_title").text(truncText($("#pageTitleText").val()));	
	else $("#demo_title").text(chrome.i18n.getMessage("demo")+' Page');
	$("#demo_content").css('backgroundColor', $("#s_bg").val());
	$("#t_link").css('color', $("#s_link").val());
	$("#test table").css('border', "1px solid #" + $("#s_table").val());
	$("#t_table, #demo_content h1").css('color', $("#s_text").val());
	if ($("#font").val() == '-Custom-' && $("#customfont").val()) {
		$("#t_table, #demo_content h1").css({'font-family': $("#customfont").val(), 'font-size': $("#fontsize").val()});
	} else if ($("#font").val() != '-Unchanged-' && $("#font").val() != '-Custom-') {
		$("#t_table, #demo_content h1").css({'font-family': $("#font").val(), 'font-size': $("#fontsize").val()});
	} else {	
		$("#t_table, #demo_content h1").css({'font-family': 'Arial, sans-serif', 'font-size': '12px'});
	}
	if ($('#hidePageTitles').is(':checked')) $("#t_link").css('textDecoration', 'underline');
	if ($('#removeBold').is(':checked')) $("#demo_content h1").css('font-weight', 'normal');
	else  $("#demo_content h1").css('font-weight', 'bold');
	if ($('#showUnderline').is(':checked')) $("#t_link").css('textDecoration', 'underline');
	else $("#t_link").css('textDecoration', 'none');
	if ($("#sfwmode").val() == 'Paranoid') $(".sampleimage").attr('style','visibility: hidden');
	else if ($("#sfwmode").val() == 'NSFW') $(".sampleimage").attr('style','visibility: visible; opacity: 1 !important;').unbind();
	else opacitytest();
}

function uncloak() {
	bkg.uncloakAll();
}

function stylePreset(s) {
	if (s) {
		var bg='FFFFFF';
		var text='000000';
		var link='000099';
		var table='cccccc';
		// Specific style colours
		switch (s)
		{
			case 'White - Gray':
				text='AAAAAA';
				link='AAAAAA';
				table='AAAAAA';
				break;
			case 'White - Green':
				link='008000';
				break;
			case 'Gray - Blue':
				bg='EEEEEE';
				break;
			case 'Light Red - Pale Blue':
				bg='FFEEE3';
				text='555';
				link='7F75AA';
				break;
			case 'Black - Blue':
				bg='000000';
				text='FFFFFF';
				link='36F';
				table='333333';
				break;
			case 'Dark Brown - Off-White':
				bg='2c2c2c';
				text='e5e9a8';
				link='5cb0cc';
				table='7f7f7f';
				break;
			case 'Black - Green':
				bg='000000';
				text='FFFFFF';
				link='00FF00';
				table='333333';
				break;
			case 'Black - Red':
				bg='000000';
				text='FFFFFF';
				link='FF0000';
				table='333333';
				break;
			case 'Black - Pink':
				bg='000000';
				text='FFFFFF';
				link='FF1CAE';
				table='333333';
				break;
		}
		$('#s_bg').val(bg);
		$('#s_text').val(text);
		$('#s_link').val(link);
		$('#s_table').val(table);
		updateDemo();
	}
}

// <!-- modified from KB SSL Enforcer: https://code.google.com/p/kbsslenforcer/
function addList(type) {
	var domain = $('#url').val();
	var domainValidator = new RegExp('^[\\-\\w]+(\\.[\\-\\w]+)*(:[0-9]+)?$'); // https://stackoverflow.com/posts/18696953/revisions
	
	if (!(domainValidator.test(domain.toLowerCase()))) {
		$('#listMsg').html(chrome.i18n.getMessage("invaliddomain")).stop().fadeIn("slow").delay(2000).fadeOut("slow");
	} else {
		domainHandler(domain, type);
		$('#url').val('');
		$('#listMsg').html([chrome.i18n.getMessage("whitelisted"),chrome.i18n.getMessage("blacklisted")][type]+' '+domain+'.').stop().fadeIn("slow").delay(2000).fadeOut("slow");
		listUpdate();
		$('#url').focus();
	}
	return false;
}

function domainHandler(domain,action) {
	// Initialize local storage
	if (typeof(localStorage['whiteList'])=='undefined') localStorage['whiteList'] = JSON.stringify([]);
	if (typeof(localStorage['blackList'])=='undefined') localStorage['blackList'] = JSON.stringify([]);
	var whiteList = JSON.parse(localStorage['whiteList']);
	var blackList = JSON.parse(localStorage['blackList']);
	
	// Remove domain from whitelist and blacklist
	var pos = whiteList.indexOf(domain);
	if (pos>-1) whiteList.splice(pos,1);
	pos = blackList.indexOf(domain);
	if (pos>-1) blackList.splice(blackList.indexOf(domain),1);
	
	switch(action) {
		case 0:	// Whitelist
			whiteList.push(domain);
			break;
		case 1:	// Blacklist
			blackList.push(domain);
			break;
		case 2:	// Remove
			break;
	}
	localStorage['whiteList'] = JSON.stringify(whiteList);
	localStorage['blackList'] = JSON.stringify(blackList);
	return false;
}
function domainRemover(domain) {
	domainHandler(domain,2);
	listUpdate();
	return false;
}
function listUpdate() {
	var whiteList = JSON.parse(localStorage['whiteList']);
	var blackList = JSON.parse(localStorage['blackList']);
	
	var whitelistCompiled = '';
	if(whiteList.length==0) whitelistCompiled = '['+chrome.i18n.getMessage("empty")+']';
	else {
		whiteList.sort();
		for(i in whiteList) whitelistCompiled += '<div class="listentry">'+whiteList[i]+' <a href="javascript:;" style="color:#f00;float:right;" rel="'+whiteList[i]+'" class="domainRemover">X</a></div>';
	}
	var blacklistCompiled = '';
	if (blackList.length==0) blacklistCompiled = '['+chrome.i18n.getMessage("empty")+']';
	else {
		blackList.sort();
		for(i in blackList) blacklistCompiled += '<div class="listentry">'+blackList[i]+' <a href="javascript:;" style="color:#f00;float:right;" rel="'+blackList[i]+'" class="domainRemover">X</a></div>';
	}
	$('#whitelist').html(whitelistCompiled);
	$('#blacklist').html(blacklistCompiled);
	$(".domainRemover").unbind('click');
	$(".domainRemover").click(function() { domainRemover($(this).attr('rel'));});
}
function listclear(type) {
	if (confirm([chrome.i18n.getMessage("removefromwhitelist"),chrome.i18n.getMessage("removefromblacklist")][type]+'?')) {
		localStorage[['whiteList','blackList'][type]] = JSON.stringify([]);
		listUpdate();
	}
	return false;
}
// from KB SSL Enforcer: https://code.google.com/p/kbsslenforcer/ -->

function revertColours(s) {
	$('#s_bg').val(localStorage['s_bg']);
	$('#s_text').val(localStorage['s_text']);
	$('#s_link').val(localStorage['s_link']);
	$('#s_table').val(localStorage['s_table']);
	updateDemo();
}

function colorPickLoad(id) {
	$('#'+id).ColorPicker({
		onBeforeShow: function () {
			$(this).ColorPickerSetColor(this.value);
		},
		onChange: function (hsb, hex, rgb) {
			$('#'+id).val(hex);
			updateDemo();
		}
	});
}