const code = {

	"AJAX": {
		"scope": "javascript,typescript",
		"prefix": "json",
		"body": [
			"var data;",
			"var request = new XMLHttpRequest();",
			"",
			"request.open('GET', 'js/data.json');",
			"",
			"request.onreadystatechange = function () {",
			"  if (request.status === 200 && request.readyState === 4) {",
			"    data = JSON.parse(request.responseText);",
			"    console.log(data);",
			"    console.log(request);",
			"  }",
			"};",
			"",
			"request.send();"
		],
		"description": "AJAX code snippet"
	},
	"callback": {
		"scope": "javascript,typescript",
		"prefix": "callback",
		"body": [
			"var button = document.querySelector('button');",
			"button.addEventListener('click', function(e) {",
			"  console.log('Button clicked!');",
			"}, false);",
			"}"
		],
		"description": "Callback example"
	},
	"constructors": {
		"scope": "javascript,typescript",
		"prefix": "constructor",
		"body": [
			"function Person(name, age) {",
			"  this.name = name;",
			"  this.age = age;",
			"  this.greet = function() {",
			"    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);",
			"  };",
			"}",
			"",
			"const john = new Person('John', 30);",
			"john.greet();"
		],
		"description": "Constructor example"
	},
	"promises": {
		"scope": "javascript,typescript",
		"prefix": "promises",
		"body": [
			"var artists, calendar;",
			"function loadData(url) {",
			"  return new Promise(function (resolve, reject) {",
			"    var req = new XMLHttpRequest();",
			"    req.open('GET', url);",
			"    req.onload = function () {",
			"      if (req.status == 200) {",
			"        console.log('getting ' + url);",
			"        resolve(JSON.parse(req.response))",
			"      } else {",
			"        reject(Error('Problem loading data'))",
			"      }",
			"    }",
			"    req.send();",
			"  });",
			"}",
			"//simple chaining: ",
			"loadData('js/data_artists.json').then((data)=>console.log(data)).then(()=>console.log('done'));",
			"",
			"calendar = loadData('js/data_schedule.json');",
			"artists = loadData('js/data_artists.json');"
		],
		"description": "Promises example"
	},
	"fetch": {
		"scope": "javascript,typescript",
		"prefix": "fetch",
		"body": [
			"fetch('https://api.github.com/users')",
			"  .then(response => response.json())",
			"  .then(data => console.log(data));"
		],
		"description": "Fetch example"
	},
	"propagation": {
		"scope": "javascript,typescript",
		"prefix": "propagation",
		"body": [
			"document.querySelector('.parent').addEventListener('click', function() {",
			"  console.log('Parent clicked');",
			"}, false);",
			"",
			"document.querySelector('.child').addEventListener('click', function(e) {",
			"  e.stopPropagation();",
			"  console.log('Child clicked');",
			"}, false);"
		],
		"description": "Event propagation example"
	},
	"arrow functions": {
		"scope": "javascript,typescript",
		"prefix": "arrow",
		"body": [
			"node.addEventListener('click', e => node.classList.toggle('myClass'), false);"
		],
		"description": "Event propagation example"
	},
	"sass": {
		"scope": "scss",
		"prefix": "sass",
		"body": [
			"$orange: hsl(15, 80%, 50%);",
			".nav {",
			"  color: darken($orange, 20);",
			"  .nav-item { /* nesting for child elements */ }",
			"  &.container { /* direct child */ }",
			"}",
			"@mixin btn($bg, $color: #fff, $font: 1) { //setting defaults",
			"  display: inline-block;",
			"  font-size: $font + rem;",
			"  border-radius: 4px;",
			"  color: $color;",
			"  background-color: $bg;",
			"}",
			"",
			".nav .btn.hamburger {",
			"  @include btn($green, #fff, 1); //calling mixin with the word 'include'",
			"  @media all and (max-width: 600px) {",
			"    display: block;",
			"  }",
			"}"
		],
		"description": "Sass example"
	},
	"css variables": {
		"scope": "css",
		"prefix": "css",
		"body": [
			":root {",
			"  --red: #ff0000;",
			"  --btn: {",
			"    display: inline-block;",
			"    font-size: 1rem;",
			"  };",
			"  @custom-media --min (width <= 600px);",
			"  @custom-media --max (width > 600px);",
			"  @custom-selector :--headings h1, h2, h3, h4;",
			"}",
			":--headings {",
			"  margin-top: 0;",
			"}",
			".test {",
			"  color: color(var(--red) shade(20%)); //suspect",
			"  @media (--min) {   ...  }",
			"}",
			".nav .btn.hamburger {",
			"  @apply --btn;",
			"}"
		],
		"description": "CSS variables example"
	},
	"flexbox": {
		"scope": "css",
		"prefix": "flex",
		"body": [
			".container {",
			"  display: flex;",
			"  justify-content: center;",
			"  align-items: center;",
			"}",
			".item {",
			"  flex: 1 1 auto;",
			"  @media all and (min-width: 600px) {",
			"    flex-direction: row;",
			"  }",
			"}"
		],
		"description": "Flexbox example"
	},
	"grid": {
		"scope": "css",
		"prefix": "grid",
		"body": [
			".container {",
			"  display: grid;",
			"  grid-template-columns: repeat(3, 1fr);",
			"  grid-gap: 1rem;",
			"}",
			".item {",
			"  grid-column: span 2;",
			"  grid-row: span 3;",
			"}"
		],
		"description": "Grid example"
	},
	"closures": {
		"scope": "javascript,typescript",
		"prefix": "closures",
		"body": [
			"// global scope",
			"const e = 10;",
			"function sum(a) {",
			"  return function (b) {",
			"    return function (c) {",
			"      // outer functions scope",
			"      return function (d) {",
			"        // local scope",
			"        return a + b + c + d + e;",
			"      };",
			"    };",
			"  };",
			"}",
			"",
			"console.log(sum(1)(2)(3)(4)); // 20"
		],
		"description": "Closures example"
	},
	"iife": {
		"scope": "javascript,typescript",
		"prefix": "iffe",
		"body": [
			"(function () {",
			"  console.log('IIFE');",
			"})();"
		],
		"description": "IIFE example"
	},
	"json": {
		"scope": "javascript,typescript",
		"prefix": "json",
		"body": [
			"var data;",
			"var request = new XMLHttpRequest();",
			"",
			"request.open('GET', 'js/data.json');",
			"",
			"request.onreadystatechange = function () {",
			"  if (request.status === 200 && request.readyState === 4) {",
			"    data = JSON.parse(request.responseText);",
			"    console.log(data);",
			"    console.log(request);",
			"  }",
			"};",
			"",
			"request.send();"
		],
		"description": "Working with JSON"
	},
	"routing": {
		"scope": "javascript,typescript",
		"prefix": "routing",
		"body": [
			"const router = new Router();",
			"router.addRoute('/', () => console.log('Home page'));",
			"router.addRoute('/about', () => console.log('About page'));",
			"router.addRoute('/contact', () => console.log('Contact page'));",
			"router.addRoute('/404', () => console.log('Page not found'));",
			"router.listen();",
			"var express = require('express');var app = express();var data = require('./data.json');app.get('/', function(req, res) {  res.send('<h1>Welcome</h1>');});app.get('/speakers', function(req, res) {  var info = '';  data.speakers.forEach(function(item) {    info += `      <h2>${item.name}</h2>      <p>${item.summary}</p>    `;  });  res.send(`    <h1>Artist List</h1>    ${info}  `);});"
		],
		"description": "Routing example"
	},
	"context": {
		"scope": "javascript,typescript",
		"prefix": "react",
		"body": [
			"import { createContext } from 'react';",
			"const ThemeContext = createContext('light');",
			"  // ...",
			"import { useContext } from 'react';",
			"",
			"function Button() {",
			"  const theme = useContext(ThemeContext);",
			"  // ...",
			"}",
			"",
			"function MyPage() {",
			"  return (",
			"    <ThemeContext.Provider value=\"dark\">",
			"      <Form />",
			"    </ThemeContext.Provider>",
			"  function Form() {",
			"    // ... renders buttons inside ...",
			"  }",
			"  return (",
			"    <ThemeContext.Provider value=\"dark\">",
			"      <Form />",
			"    </ThemeContext.Provider>",
			"  );",
			"}"
		],
		"description": "Routing example"
	}

}
export default code