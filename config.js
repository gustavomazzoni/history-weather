/* Exports Apps configurations */

module.exports = {
	server: {
		requestHeaders: {
			protocol: "http",
			hostname: "localhost",
			port: process.env.PORT || "3000",
			path: "/api/v1/weather/"
		}
	}
};