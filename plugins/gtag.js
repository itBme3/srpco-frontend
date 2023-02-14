import Vue from "vue";
import VueGtag from "vue-gtag";
Vue.use(VueGtag, {
	config: {
		id: process.env.GAU,
		params: {
			send_page_view: true
		}
	},
	includes: [
		{
			id: process.env.GA,
			params: {
				send_page_view: true
			}
		}
	]
});