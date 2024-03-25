export function Task({ task, onDeleteTask, onComplete, onEdit }) {
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
