import { Link } from 'react-router'

export default function Header() {
    return (
        <header>
         <h1><Link className='logo' to="/" ></Link></h1>   
        </header>
    
    );
}