import { useContext } from 'react';

import Header from './components/Header';
import Calculator from './components/Calculator/Calculator';

import { ThemeContext } from './contexts/ThemeContext';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      <Header />
      <div className='container'>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
