import logo from './logo.svg';
import './App.css';
import { AddableList } from './components';
import { MeasurementsView } from './components/views/Measurements'

function App() {
  const list = [
    { value: 'xxx0', text: 'yyy0' },
    { value: 'xxx1', text: 'yyy1' },
    { value: 'xxx2', text: 'yyy2' },
    { value: 'xxx3', text: 'yyy3' },
  ];
  return (
    <div className="App">
      <AddableList id="ernie" list={list} />
      <div id="views" className="flex">
          <MeasurementsView />
      </div>
    </div>
  );
}

export default App;
