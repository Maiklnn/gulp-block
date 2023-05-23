const Book = (props) => {
	return React.createElement('div', {}, [
		React.createElement('h2', {}, props.name),
		React.createElement('p', {}, props.year),
		React.createElement('p', {}, props.price),
	])
}

const App = () => {
	return React.createElement('div', {}, [
		React.createElement('h1', {id: 'hello', className: 'class1'}, 'Hello from React'),
		React.createElement(Book, {name: 'JS for beginner', year: 2018, price: 1000}),
		React.createElement(Book, {name: 'REACT', year: 2018, price: 1000}),
		React.createElement(Book, {name: 'PHP', year: 2018, price: 1000}),
	])
}

ReactDOM.render(React.createElement(App), document.getElementById('root'))
