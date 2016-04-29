var timer;
var count = 0;

var changeAnimate = function(action) {
	if (action == "turn on") {
		timer = setInterval(animate, 16.666);
	} else if (action == "turn off") {
		clearInterval(timer);
	}
}

var animate = function() {
	chrome.storage.local.get('speed', function(ret) {
		count += ret.speed / 100;
		if (count > 1) {
			chrome.tabs.executeScript({
				code: 'document.body.scrollTop += ' + count
			});
			count -= Math.floor(count);
		}
	});
}