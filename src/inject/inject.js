chrome.extension.sendMessage({}, function(response) {
	$(function() {
		var playermission = window.location.pathname.match(/\/(\d+)\/$/);
		if (playermission == null) return;

		answer_urls = $('.answer_text');
		for (var i=0; i < answer_urls.length; i++) {
			var answer = answer_urls[i];
			var product_url = $.trim(answer.innerText);

			if (!is_valid_url(product_url)) continue;

			$.ajax({
			  url: product_url,
			  context: answer
			})
			.done(function(data) {
				var product_title_html = data.match(/<h1.+\s*.+\s*<\/h1>/);
				if (!product_title_html) product_title_html = data.match(/<h2.+\s*.+\s*<\/h2>/);
				if (!product_title_html) product_title_html = data.match(/<b.+\s*.+\s*<\/b>/);
				var product_title = $.trim($(product_title_html[0]).text());
				this.innerHTML = "<a href="+this.innerText+">"+product_title+"</a>";
			});
		}
	});
});


$.ajaxPrefilter( function (options) {
	if (options.crossDomain && jQuery.support.cors) {
		var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
		options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
	}
});

function is_valid_url(str) {
  var pattern = new RegExp('^(http|https|www|m\.)');
  if(!pattern.test(str)) {
    return false;
  } else {
    return true;
  }
}
