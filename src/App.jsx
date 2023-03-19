import { useState } from 'react';
import './App.css';
import './App.scss';

const App = () => {
	const [name, setName] = useState('');

	return (
		<div className='app'>
			<div className=''>
				<h1>Hola Mundo!</h1>
			</div>
			<div className=''>
				<label htmlFor='name'>Nombre: </label>
				<input
					id='name'
					type='text'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
			</div>
		</div>
	);
};

export default App;
