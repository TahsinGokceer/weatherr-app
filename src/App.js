import './App.css';
import {CitiesProvider} from "./context/CitiesContext"
import Container from './components/Container';

function App() {
	return (
		<div className='app'>
			<CitiesProvider>
				<Container/>
			</CitiesProvider>
		</div>
	);
}

export default App;
