<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Varela+Round');

* {
	box-sizing: border-box;
}

html, body {
	padding: 0;
	margin: 0;
}

body {
	height: 100vh;
}

#app {
  font-family: "Varela Round", Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  position: relative;
}

button, input {
	// border: none;
	padding: 4px 5px;
	border-radius: 5px;
	border: 2px solid rgba(0,0,0,.3);
	margin: 2px;
	font-family: inherit;
}

button {
	cursor: pointer;
}

@media print {
	#nav {
		display: none;
	}
}
</style>
