import { useNavigate } from 'react-router-dom';
import '../style/style.css'

export default function About() {
  const navigate = useNavigate();
  return (
    <>
      <div>About</div>
      <button onClick={() => { navigate('/'); }}>
        Home
      </button>
      <button onClick={() => { navigate('/search'); }}>
        Search
      </button>
    </>
  );
}
