import { useState } from 'react';
import Axios from 'axios';

import Output from './Output';
import Message from '../shared/Message';

import './Calculator.css';

function Calculator() {
  const [current, setCurrent] = useState('');
  const [previous, setPrevious] = useState('');
  const [operation, setOperation] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [msg, setMsg] = useState();
  const [hasMsg, setHasMsg] = useState(false);
  const [timer, setTimer] = useState();
  const [lastSavedValue, setLastSavedValue] = useState(null);

  const showMsg = (msgText, error = false) => {
    clearTimeout(timer);
    if (error) {
      setHasError(true);
    }
    setHasMsg(true);
    setMsg(msgText);
    const timerID = setTimeout(() => {
      setHasError(false);
      setHasMsg(false);
      clearTimeout(timer);
      setTimer(null);
    }, 2000);
    setTimer(timerID);
  };

  const saveHandler = async () => {
    if (current === '') return;
    setIsPending(true);

    try {
      await Axios.post('api/calculator', { numValue: current });
      setIsPending(false);
      setLastSavedValue(current);
      showMsg('Value has been saved');
    } catch (err) {
      setIsPending(false);
      console.log(err.message);
      showMsg('Could not save the data, please try again later', true);
    }
  };

  const retrieveHandler = async () => {
    setIsPending(true);

    if (lastSavedValue) {
      setCurrent(lastSavedValue);
      setIsPending(false);
      showMsg('Saved data pasted');
      return;
    }

    try {
      const response = await Axios.get('api/calculator');
      if (response.data.value) {
        setCurrent(response.data.value);
        setIsPending(false);
        showMsg('Saved data pasted');
      } else {
        throw Error('Empty db');
      }
    } catch (err) {
      setIsPending(false);
      console.log(err.message);
      showMsg('Could not fetch data, please try again later', true);
    }
  };

  const numClickHandler = (el) => {
    const value = el.target.getAttribute('data');
    if (value === '.' && current.includes('.')) return;
    setCurrent(current + value);
  };

  const deleteHandler = () => {
    setCurrent(String(current).slice(0, -1));
  };

  const allclearHandler = () => {
    setCurrent('');
    setOperation('');
    setPrevious('');
  };

  const chooseOperationHandler = (el) => {
    if (current === '') return;
    if (previous !== '') {
      let value = compute();
      setPrevious(value);
    } else {
      setPrevious(current);
    }
    setCurrent('');
    setOperation(el.target.getAttribute('data'));
  };

  const equalHandler = () => {
    let value = compute();
    if (value === undefined || value === null) return;
    setCurrent(value);
    setPrevious('');
    setOperation('');
  };

  const negateHandler = () => {
    const negatedValue =
      String(current).substring(0, 1) === '-'
        ? String(current).slice(1)
        : `-${current}`;
    setCurrent(negatedValue);
  };

  const compute = () => {
    let result;
    let previousNumber = parseFloat(previous);
    let currentNumber = parseFloat(current);
    if (isNaN(previousNumber) || isNaN(currentNumber)) return;
    switch (operation) {
      case '÷':
        result = previousNumber / currentNumber;
        break;
      case 'x':
        result = previousNumber * currentNumber;
        break;
      case '+':
        result = previousNumber + currentNumber;
        break;
      case '-':
        result = previousNumber - currentNumber;
        break;
      default:
        return;
    }
    return result;
  };

  return (
    <div className='calculator'>
      <Message
        show={hasMsg}
        color={hasError ? 'red' : 'green'}
        text={msg}
        top={-20}
        left={0}
      />
      <Output
        previous={previous}
        current={current}
        isPending={isPending}
        operation={operation}
      />
      <div className='memory-btns'>
        <button
          title='Recall the value stored in memory and display it'
          className='memory'
          disabled={isPending}
          onClick={retrieveHandler}
        >
          mr
        </button>
        <button
          title='Add the displayed value to the memory'
          className='memory'
          onClick={saveHandler}
          disabled={isPending}
        >
          ms
        </button>

        <button
          title='Clear All'
          className='ac'
          onClick={allclearHandler}
          disabled={isPending}
        >
          AC
        </button>
        <button
          title='Delete/Backspace'
          className='delete'
          onClick={deleteHandler}
          disabled={isPending}
        >
          DEL
        </button>
      </div>
      <div className='operation-btns'>
        <button
          title='Add'
          data='+'
          onClick={chooseOperationHandler}
          disabled={isPending}
        >
          +
        </button>
        <button
          title='Subtract'
          data='-'
          onClick={chooseOperationHandler}
          disabled={isPending}
        >
          -
        </button>
        <button
          title='Divide'
          data='÷'
          onClick={chooseOperationHandler}
          disabled={isPending}
        >
          ÷
        </button>
        <button
          title='Multiply'
          data='x'
          onClick={chooseOperationHandler}
          disabled={isPending}
        >
          x
        </button>
      </div>
      <div className='values'>
        <button data={7} onClick={numClickHandler} disabled={isPending}>
          7
        </button>
        <button data={8} onClick={numClickHandler} disabled={isPending}>
          8
        </button>
        <button data={9} onClick={numClickHandler} disabled={isPending}>
          9
        </button>
        <button data={4} onClick={numClickHandler} disabled={isPending}>
          4
        </button>
        <button data={5} onClick={numClickHandler} disabled={isPending}>
          5
        </button>
        <button data={6} onClick={numClickHandler} disabled={isPending}>
          6
        </button>
        <button data={1} onClick={numClickHandler} disabled={isPending}>
          1
        </button>
        <button data={2} onClick={numClickHandler} disabled={isPending}>
          2
        </button>
        <button data={3} onClick={numClickHandler} disabled={isPending}>
          3
        </button>
        <button data={0} onClick={numClickHandler} disabled={isPending}>
          0
        </button>
        <button data='.' onClick={numClickHandler} disabled={isPending}>
          .
        </button>
        <button title='Plus/Minus' onClick={negateHandler} disabled={isPending}>
          +/-
        </button>
        <button
          title='Execute calculation'
          className='equals'
          onClick={equalHandler}
          disabled={isPending}
        >
          =
        </button>
      </div>
    </div>
  );
}
export default Calculator;
