export function Filter({ sortBy, setSortBy, onClearList }) {
	return (
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
	)
}
