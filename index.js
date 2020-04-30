var cacheManager = require('cache-manager');

module.exports = {
	init: function() {
		this.cache = cacheManager.caching({
			store: 'memory', max: process.env.CACHE_MAXSIZE || 100, ttl: process.env.CACHE_TTL || 3600/*seconds*/
		});
	},

	// Desktop:
	// Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
	// Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/W.X.Y.Z‡ Safari/537.36
	// or (rarely used):
	// Googlebot/2.1 (+http://www.google.com/bot.html)
	//
	// Mobile:
	// Mozilla/5.0 (Linux; Android 5.0; SM-G920A) AppleWebKit (KHTML, like Gecko) Chrome Mobile Safari (compatible; AdsBot-Google-Mobile; +http://www.google.com/mobile/adsbot.html)

	// Desktop - width: 1440, height: 718
	// Height - width: 360, height: 640

	requestReceived: function(req, res, next) {
		let cache_prefix = ''

		if (req.prerender.width) {

			if (req.prerender.width === '360') {
				cache_prefix = 'mobile.'
			} else if (req.prerender.width === '1440') {
				cache_prefix = 'desktop.'
			}

		} else {

			if (req.headers['user-agent'].indexOf('Android') !== 0) {
				cache_prefix = 'mobile.'
			} else {
				cache_prefix = 'desktop.'
			}

		}

		this.cache.get(cache_prefix + req.prerender.url, function (err, result) {
			if (!err && result) {
				console.log('Gotcha!!!!!!!!!!')
				req.prerender.cacheHit = true;
				res.send(200, result);
			} else {
				next();
			}
		});
	},

	beforeSend: function(req, res, next) {
		let cache_prefix = ''

		if (req.prerender.width === '360') {
			cache_prefix = 'mobile.'
		} else if (req.prerender.width === '1440') {
			cache_prefix = 'desktop.'
		} else {
			cache_prefix = ''
		}

		console.log(req.prerender.statusCode)
		console.log(cache_prefix + req.prerender.url)

		if (!req.prerender.cacheHit && req.prerender.statusCode == 200) {
			this.cache.set(cache_prefix + req.prerender.url, req.prerender.content, { ttl: req.prerender.ttl ? req.prerender.ttl : 3600 });
		}
		next();
	}
};
