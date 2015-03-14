'use strict';


var minW = 300;	// minimum video width allowed
var vidWOrig;	// minimum video dimesions
var vidHOrig;

function resizeToCover() {
	var vidView = $('#video-viewport');
	var vidW = $(window).width();
	var vidH = $(window).height();

	//set the video viewport ot the window size
	vidView.width(vidW);
	vidView.height(vidH);

	//use the largest scale factor of horizontal/vertical
	var scaleH = vidW / vidWOrig;
	var scaleV = vidH / vidHOrig;
	var scale = scaleH > scaleV ? scaleH : scaleV;

	//don't allow the scaled width < minimum video width
	if( scale * vidWOrig < minW) {
		scale = minW / vidWOrig;
	}

	//now scale the video
	$('#video').width(scale * vidWOrig);
	$('#video').height(scale * vidHOrig);

	var xScroll = ( $('#video').width() - $('#splash').width() ) / 2;
	var yScroll = ( $('#video').height() - $('#splash').height() ) / 2;

	//and center it by scrolling the video viewport
	$('#video-viewport').scrollLeft( xScroll );
	$('#video-viewport').scrollTop( yScroll );

	//debug output
	$('#debug').html('<p>win_w: ' + $(window).width() + '</p>');
	$('#debug').append('<p>win_h: ' + $(window).height() + '</p>');
	$('#debug').append('<p>viewport_w: ' + $('#video-viewport').width() + '</p>');
	$('#debug').append('<p>viewport_h: ' + $('#video-viewport').height() + '</p>');
	$('#debug').append('<p>video_w: ' + $('#video').width() + '</p>');
	$('#debug').append('<p>video_h: ' + $('#video').height() + '</p>');
	$('#debug').append('<p>vidWOrig: ' + vidWOrig + '</p>');
	$('#debug').append('<p>vidHOrig: ' + vidHOrig + '</p>');
	$('#debug').append('<p>scale: ' + scale + '</p>');
}

function initResizeCover() {
	vidWOrig = parseInt( $('#video').attr('width') );
	vidHOrig = parseInt( $('#video').attr('height') );
	$('#debug').append('<p>DOM loaded</p>');

	$(window).resize(function(){ resizeToCover(); });
	$(window).trigger('resize');
}

function nsfwReady() {
	initResizeCover();
}

$(document).ready(function() {
	nsfwReady();
});

$(window).load(function() {
	$('.splash-cover').delay(3000).addClass('loaded');
});