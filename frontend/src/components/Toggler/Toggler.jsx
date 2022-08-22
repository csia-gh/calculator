import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

import './Toggler.css';

function Toggler() {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return (
    <div className='toggler'>
      <span style={{ color: isDark ? 'grey' : 'yellow' }}>☀︎</span>
      <div className='switch-checkbox'>
        <label className='switch'>
          <input type='checkbox' onChange={toggleTheme} checked={isDark} />
          <span className='slider round'> </span>
        </label>
      </div>
      <span style={{ color: isDark ? '#c96dfd' : 'grey' }}>☽</span>
    </div>
  );
}
export default Toggler;
