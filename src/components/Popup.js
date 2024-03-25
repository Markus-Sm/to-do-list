export function Popup({ description, setDescription, confirmEdit, cancelEdit }) {
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
