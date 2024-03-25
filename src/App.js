import { useState } from 'react'

const initialTasks = [
	{
		id: 23123,
		description: 'Drink tea',
		done: false,
	},
	{
		id: 5023121,
		description: 'Do some shopping',
		done: false,
	},
	{
		id: 131311,
		description: 'Walk the dog',
		done: false,
	},
]

function App() {
	const [tasks, setTasks] = useState(initialTasks)
	const [showPopup, setShowPopup] = useState(false)
	const [editTask, setEditTask] = useState(null)
	const [editedDescription, setEditedDescription] = useState('')

	function handleAddTasks(task) {
		setTasks(tasks => [...tasks, task])
	}

	function handleDeleteItem(id) {
		setTasks(tasks => tasks.filter(task => task.id !== id))
	}

	function handleToggleTask(id) {
		setTasks(tasks => tasks.map(task => (task.id === id ? { ...task, done: !task.done } : task)))
	}

	function handleTogglePopup(task) {
		setShowPopup(show => !show)
		setEditTask(task)
		setEditedDescription(task.description)
	}

	function handleEditedTask() {
		setTasks(tasks => tasks.map(task => (task.id === editTask.id ? { ...task, description: editedDescription } : task)))
		setShowPopup(false)
	}

	function handleClearList() {
		const confirmed = window.confirm('Are you sure you want to delete all task?')

		if (confirmed) setTasks([])
	}

	return (
		<div className='App'>
			<div className='todo'>
				<Header onAddTasks={handleAddTasks} />
				<TodoList
					tasks={tasks}
					onDeleteTask={handleDeleteItem}
					onCompleteTask={handleToggleTask}
					setPopup={handleTogglePopup}
					onClearList={handleClearList}
				/>
			</div>
			{showPopup && (
				<Popup
					description={editedDescription}
					setDescription={setEditedDescription}
					confirmEdit={handleEditedTask}
					cancelEdit={() => setShowPopup(false)}
				/>
			)}
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

function TodoList({ tasks, onDeleteTask, onCompleteTask, setPopup, onClearList }) {
	const [sortBy, setSortBy] = useState('input')

	let sortedItems

	if (sortBy === 'input') sortedItems = tasks

	if (sortBy === 'description') sortedItems = tasks.slice().sort((a, b) => a.description.localeCompare(b.description))

	if (sortBy === 'completed') sortedItems = tasks.slice().sort((a, b) => +a.done - +b.done)

	return (
		<div className='todolist'>
			<h3>Task List</h3>
			{tasks >= 0 && <p className='error-info'>No tasks on the list</p>}
			<ul>
				{sortedItems.map(task => (
					<Task
						task={task}
						key={task.id}
						onDeleteTask={onDeleteTask}
						onComplete={onCompleteTask}
						onEdit={() => setPopup(task)}
					/>
				))}
			</ul>

			<div className='list'>
				<div className='actions'>
					<select value={sortBy} onChange={e => setSortBy(e.target.value)}>
						<option value='input'>Sort by input order</option>
						<option value='description'>Sort by description</option>
						<option value='completed'>Sort by completed status</option>
					</select>
					<button onClick={onClearList}>Clear tasks</button>
				</div>
			</div>
		</div>
	)
}

function Task({ task, onDeleteTask, onComplete, onEdit }) {
	return (
		<li className={task.done ? 'completed' : ''}>
			{task.description}
			<div className='tools'>
				<button onClick={() => onComplete(task.id)} className={task.done ? 'completed' : 'complete'}>
					✅
				</button>
				<button onClick={onEdit} className='edit'>
					EDIT
				</button>
				<button onClick={() => onDeleteTask(task.id)} className='delete'>
					❌
				</button>
			</div>
		</li>
	)
}

function Popup({ description, setDescription, confirmEdit, cancelEdit }) {
	function handleDescriptionChange(e) {
		setDescription(e.target.value)
	}

	return (
		<div className='popup'>
			<h3>Edit Task:</h3>
			<div className='popup-body'>
				<p className='popup-info'></p>
				<input
					type='text'
					value={description}
					onChange={handleDescriptionChange}
					className='popup-input'
					placeholder='Enter new content of your task...'
				/>
				<button onClick={confirmEdit} className='popup-btn accept'>
					Confirm
				</button>
				<button onClick={cancelEdit} className='popup-btn cancel'>
					cancel
				</button>
			</div>
		</div>
	)
}

export default App
