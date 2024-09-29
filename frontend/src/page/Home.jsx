import { useNavigate } from 'react-router-dom';
import '../style/style.css'

export default function Home() {
    const navigate = useNavigate();
    return (
        <>
            <div >Home</div>
            <button onClick={() => { navigate('/about'); }}>
                About
            </button>
            <button onClick={() => { navigate('/search'); }}>
                Search
            </button>
        </>
    );
}
