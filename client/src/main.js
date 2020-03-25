import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");


Vue.mixin({
	methods: {
		parseRawIdsString(str) {
			const parts = str.split(",");
			let result = [];
			for (let part of parts) {
				if (part.includes("-")) {
					const [min, max] = part.split("-").map(Number);
					if (Number.isInteger(min) && Number.isInteger(max) && min < max) {
						const range = Object.keys([...Array(max - min + 1)]).map(i => +i + min);
						result = result.concat(range);
					}
				}
				else if (!!part) result.push(+part)
			}
			return [...new Set(result)].filter(n => !isNaN(n));
		}
	}
})