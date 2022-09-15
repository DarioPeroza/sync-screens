import './css/App.css';
import { useState } from 'react';
import { MainContainer } from './components/MainContainer';
import { MainContent } from './components/MainContent'

function App() {
  const [ mode, setMode ] = useState('')

  return (
    <div className="App">
      <MainContainer
        Content={MainContent}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
}

export default App;
