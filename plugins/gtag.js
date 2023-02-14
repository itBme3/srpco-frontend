import Vue from "vue";
import VueGtag from "vue-gtag";
console.log({ GAU: process.env.GAU })
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