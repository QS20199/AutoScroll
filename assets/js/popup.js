var timer;
var speed = document.getElementById("speed");
var count = 0;

document.getElementById("ctrl-btn").addEventListener("click", function(event) {
	this.classList.toggle('btn-success');
	if (timer) { //本身已启用
		this.innerHTML = '已停用';
		clearInterval(timer);
		timer = null;
	} else {
		this.innerHTML = '已启用';
		timer = setInterval(animate, 16.66);
	}
}, false)

var animate = function() {
	count += speed.value / 10;
	if (count > 1) {
		chrome.tabs.executeScript({
			code: 'document.body.scrollTop += ' + count
		});
		count -= Math.floor(count);
	}

}