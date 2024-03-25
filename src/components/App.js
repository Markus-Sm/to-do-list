import { useState } from 'react'
import { TodoList } from './TodoList'
import { Popup } from './Popup'
import { Header } from './Header'

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

export default App
