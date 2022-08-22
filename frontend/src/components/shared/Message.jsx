import './Message.css';

function Message({ top, left, text, color, show }) {
  return (
    <small className={`message ${show ? 'show' : ''}`} style={{ top, left, color }}>
      {text}
    </small>
  );
}
export default Message;
