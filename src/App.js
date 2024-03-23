const tasks = [
	{
		task: 'Drink tea',
	},
	{
		task: 'Do some shopping',
	},
	{
		task: 'Walk the dog',
	},
	{
		task: 'Go throw out the trash',
	},
]

function App() {
	return (
		<div className='App'>
			<div class='todo'>
				<Header />
				<TodoList data={tasks} />
			</div>
		</div>
	)
}

function Header() {
	return (
		<div className='header'>
			<h1>ToDo List</h1>
			<input type='text' className='todo-input' placeholder='Enter the content of the task' />
			<button className='btn-add'>Add</button>
		</div>
	)
}

function TodoList({ data }) {
	return (
		<div className='todolist'>
			<h3>Task List</h3>
			<p className='error-info'>No tasks on the list</p>
			<ul>
				{data.map((el, i) => (
					<Task task={el.task} key={i} />
				))}
			</ul>
		</div>
	)
}

function Task({ task, key }) {
	return (
		<li data-id={key}>
			{task}
			<div className='tools'>
				<button className='complete'>✅</button>
				<button className='edit'>EDIT</button>
			</div>
		</li>
	)
}

export default App
