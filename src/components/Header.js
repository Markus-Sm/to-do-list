import { useState } from 'react'

export function Header({ onAddTasks }) {
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
