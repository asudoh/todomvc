// To run the test cases:
//     With node.js:
//         > cd /path/to/todomvc/examples/liaison/
//         > node node_modules/intern/bin/intern-client.js config=test/intern
//     With node.js and WebDriver:
//         > cd /path/to/todomvc/examples/liaison/
//         > npm test
//     With browser:
//         > cd /path/to/todomvc
//         > gulp serve
//         Then hit: http://localhost:8080/examples/liaison/node_modules/intern/client.html?config=test/intern
define({
	loader: {
		baseUrl: typeof window !== 'undefined' ? '../..' : '.',
		packages: [
			{
				name: 'requirejs-dplugins',
				location: './node_modules/requirejs-dplugins'
			},
			{
				name: 'decor',
				location: './node_modules/decor'
			},
			{
				name: 'liaison',
				location: './node_modules/liaison'
			},
			{
				name: 'todo',
				location: './js/todo'
			},
			{
				name: 'test',
				location: './test'
			}
		]
	},

	useLoader: {
		'host-node': 'dojo/dojo',
		'host-browser': '../../node_modules/requirejs/require.js'
	},

	proxyPort: 9000,

	proxyUrl: 'http://localhost:9000/',

	capabilities: {
		'selenium-version': '2.44.0',
		'idle-timeout': 60
	},

	environments: [
		{browserName: 'internet explorer'},
		{browserName: 'firefox'},
		{browserName: 'chrome'},
		{browserName: 'safari'}
	],

	maxConcurrency: 3,

	useSauceConnect: false,

	webdriver: {
		host: 'localhost',
		port: 4444
	},

	suites: ['test/all'],

	excludeInstrumentation: /^(node_modules|test)/
});
