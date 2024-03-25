import { useState } from 'react'

// const initialTasks = [
// 	{
// 		task: 'Drink tea',
// 		done: false,
// 	},
// 	{
// 		task: 'Do some shopping',
// 		done: false,
// 	},
// 	{
// 		task: 'Walk the dog',
// 		done: false,
// 	},
// 	{
// 		task: 'Go throw out the trash',
// 		done: false,
// 	},
// 	{
// 		task: 'Go out',
// 		done: false,
// 	},
// ]

function App() {
	const [tasks, setTasks] = useState([])

	function handleAddTasks(task) {
		setTasks(tasks => [...tasks, task])
	}

	function handleDeleteItem(id) {
		setTasks(tasks => tasks.filter(task => task.id !== id))
	}

	function handleToggleTask(id) {
		setTasks(tasks => tasks.map(task => (task.id === id ? { ...task, done: !task.done } : task)))
	}

	return (
		<div className='App'>
			<div className='todo'>
				<Header onAddTasks={handleAddTasks} />
				<TodoList tasks={tasks} data={tasks} onDeleteTask={handleDeleteItem} onCompleteTask={handleToggleTask} />
			</div>
			<Popup />
		</div>
	)
}

function Header({ onAddTasks }) {
	const [description, setDescription] = useState('')

	function handleSubmit(e) {
		e.preventDefault()

		if (!description) return

		const newTask = { description, done: false, id: Date.now() }

		onAddTasks(newTask)

		setDescription('')

		console.log(newTask)
	}

	return (
		<div className='header'>
			<h1>ToDo List</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					value={description}
					onChange={e => setDescription(e.target.value)}
					className='todo-input'
					placeholder='Enter the content of the task'
				/>
				<button className='btn-add'>Add</button>
			</form>
		</div>
	)
}

function TodoList({ data, onDeleteTask, onCompleteTask }) {
	return (
		<div className='todolist'>
			<h3>Task List</h3>
			{data >= 0 && <p className='error-info'>No tasks on the list</p>}
			<ul>
				{data.map(task => (
					<Task task={task} keyToList={task.id} key={task.id} onDeleteTask={onDeleteTask} onComplete={onCompleteTask} />
				))}
			</ul>
		</div>
	)
}

function Task({ task, onDeleteTask, onComplete, keyToList }) {
	return (
		<li data-id={keyToList} className={task.done ? 'completed' : ''}>
			{task.description}
			<div className='tools'>
				<button onClick={() => onComplete(task.id)} className={task.done ? 'completed' : 'complete'}>
					✅
				</button>
				<button className='edit'>EDIT</button>
				<button onClick={() => onDeleteTask(task.id)} className='delete'>
					❌
				</button>
			</div>
		</li>
	)
}

function Popup() {
	return (
		<div className='popup'>
			<h3>Edit Task:</h3>
			<div className='popup-body'>
				<p className='popup-info'></p>
				<input type='text' className='popup-inout' placeholder='Enter new content of your task...' />
				<button className='popup-btn accept'>Confirm !</button>
				<button className='popup-btn cancel'>cancel</button>
			</div>
		</div>
	)
}

export default App
