/*
*   This file is part of the Perspectives Firefox Client
*
*   Copyright (C) 2011 Dan Wendlandt
*
*   This program is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, version 3 of the License.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


var Pers_statusbar = {
	STATE_ERROR : -1,
	STATE_SEC   : 0,
	STATE_NSEC  : 1,
	STATE_NEUT  : 2,
	STATE_QUERY  : 3,
	STATE_WHITELIST : 4,

	force_update : function(event) {
		Perspectives.forceStatusUpdate(window); 
	},

	statusbar_click: function(event) {
		Pers_statusbar.open_results_dialog();
	},

	// note: when debugging, it is useful to open this dialog as a 
	// window, so we get a Firebug console, etc
	open_results_dialog: function() { 
		window.openDialog(
	//	window.open( // for debug
			"chrome://perspectives/content/results_dialog.xul", 
	//        	"perspectivesResults", "").focus();  // for debug
			"perspectivesresults", "centerscreen, chrome, toolbar").focus();

	},

	// note: when debugging, it is useful to open this dialog as a 
	// window, so we get a firebug console, etc
	open_preferences_dialog: function() { 
		window.openDialog(
	// 	window.open( // for debug
			"chrome://perspectives/content/preferences_dialog.xul", 
	//       	"perspectivesResults", "").focus();  // for debug
			"perspectivepreferences", "centerscreen, chrome, toolbar, resizable").focus();

	},

	open_about_dialog: function() {
		/* TODO: enable once all strings have been localized
		window.openDialog(
	// 	window.open( // for debug
			"chrome://perspectives/content/about_dialog.xul",
	//       	"perspectivesResults", "").focus();  // for debug
			"perspectivesabout", "centerscreen, chrome, toolbar, resizable").focus();
		*/
	},


	setStatus: function(uri,state, tooltip){
		if(uri != null && uri != window.gBrowser.currentURI) { 
		//	Pers_debug.d_print("main", "Ignoring setStatus for '" + uri.spec + 
		//	"' because current browser tab is for '" + 
		//	window.gBrowser.currentURI.spec + "'"); 
			return;  
		}
		if(!tooltip){
			tooltip = "Perspectives";
		}

		var imgList = document.querySelectorAll("image.perspective-status-image-class");
		
		if(!imgList){ //happens when called from a dialog
			imgList = window.opener.document.
				querySelectorAll("image.perspective-status-image-class");
		}

		for (var j = 0; j < imgList.length; ++j) {
			imgList[j].parentNode.setAttribute("tooltiptext", tooltip); 
			switch(state){
			case Pers_statusbar.STATE_SEC:
				Pers_debug.d_print("main", "Secure Status");
				imgList[j].setAttribute("src", "chrome://perspectives/content/img/good.png");
				continue;
			case Pers_statusbar.STATE_NSEC:
				Pers_debug.d_print("main", "Unsecure Status");
				imgList[j].setAttribute("src", "chrome://perspectives/content/img/bad.png");
				continue;
			case Pers_statusbar.STATE_NEUT:
				Pers_debug.d_print("main", "Neutral Status");
				imgList[j].setAttribute("src", "chrome://perspectives/content/img/default.png");
				continue;
			case Pers_statusbar.STATE_WHITELIST:
				//TODO: have other code call this
				Pers_debug.d_print("main", "Whitelist Status");
				imgList[j].setAttribute("src", "chrome://perspectives/content/img/whitelist.png");
				continue;
			case Pers_statusbar.STATE_QUERY:
				Pers_debug.d_print("main", "Querying Status");
				imgList[j].setAttribute("src", "chrome://perspectives/content/img/progress.gif");
				continue;
			case Pers_statusbar.STATE_ERROR:
				Pers_debug.d_print("main", "Error Status");
				imgList[j].setAttribute("src", "chrome://perspectives/content/img/error.png");
				continue;
			}
		}
		Pers_debug.d_print("main", "changing tooltip to: " + tooltip);
		return true;
	},

	openCertificates: function(){
		openDialog("chrome://pippki/content/certManager.xul", 
			"Certificate Manager","centerscreen,chrome");
	},

	openHelp: function(){
		openDialog("chrome://perspectives/content/help.xhtml","",
			"width=600,height=600,resizable=yes,centerscreen");
	}
}
