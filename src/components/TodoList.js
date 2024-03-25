import { useState } from 'react'
import { Filter } from './Filter'
import { Task } from './Task'

export function TodoList({ tasks, onDeleteTask, onCompleteTask, setPopup, onClearList }) {
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
			<Filter sortBy={sortBy} setSortBy={setSortBy} onClearList={onClearList} />
		</div>
	)
}
