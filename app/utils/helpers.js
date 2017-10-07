var axios = require('axios');

var APIKey = "b8f91c369ff59547cd47b931d8cbd45c:0:74653931";

var helpers = {
	runQuery: function(term, start, end){
		var term = term.trim();
		var start = start.trim() + "0101";
		var end = end.trim() + "1231";

		console.log("Query Run");

		return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
			params: {
				'api-key': APIKey,
				'q': term,
				'begin_date': start,
				'end_date': end
			}
		})
		.then(function(results){
			console.log("Axios Results ", results.data.response);
			return results.data.response;
		});
	},
	getSaved: function(){
		return axios.get('/api/saved')
			.then(function(results){
				console.log("axios results ", results);
				return restuls;
			})
	},
	postSaved: function(title, date, url){
		var newArticle = {
			title: title,
			date: date,
			url: url
		};
		return axios.post('/api/saved', newArticle)
			.then(function(results){
				console.log("acios results ", results._id);
				return results._id;
			})
	},
	deleteSaved: function(title, data, url){
		return axios.delete('/api/saved', {
			params: {
				'title': title,
				'data': data,
				'url': url,
			}
		})
		.then(function(results){
			console.log("axios results ", results);
			return results;
		})
	}
}

module.exports = helpers;
