import Loader from '../shared/Loader';

import './Output.css';

function Output({ previous, operation, current, isPending }) {
  return (
    <div className='output'>
      <div className='previous-operand'>
        {previous} {operation}
      </div>
      {isPending ? <Loader /> : <div className='current-operand'>{current}</div>}
    </div>
  );
}
export default Output;
