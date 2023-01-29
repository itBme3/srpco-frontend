import Vue from "vue";
import VueGtag from "vue-gtag";
import 'dotenv/config';

Vue.use(VueGtag, {
	config: { id: process.env.GA }
});