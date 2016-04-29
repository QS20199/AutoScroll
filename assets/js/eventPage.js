var timer;
var count = 0;

var changeAnimate = function(action) {
	if (action == "turn on") {
		timer = setInterval(animate, 16.666);
		chrome.storage.local.set({status: "on"});
	} else if (action == "turn off") {
		clearInterval(timer);
		chrome.storage.local.set({status: "off"});
	}
}

//开始动画
var animate = function() {
	chrome.storage.local.get('speed', function(ret) {
		count += (ret.speed || 30) / 100;
		if (count > 1) {
			chrome.tabs.executeScript({
				code: 'document.body.scrollTop += ' + count
			});
			count -= Math.floor(count);
		}
	});
}

//切换tab自动停止
chrome.tabs.onActivated.addListener(function() {
	changeAnimate("turn off");
})