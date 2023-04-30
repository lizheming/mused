import 'normalize.css';
import 'purecss';
import './style.css';

export default function Layout(props) {
  return (
    <div className="page">{props.children}</div>
  );
}