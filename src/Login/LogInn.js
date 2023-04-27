import {Link} from 'react-router-dom';

const Loginn=()=>{
    return (
        <>
            <form>
                <input type="text" placeholder="Name"/>
                <input type="password" placeholder="Password"/>
                <input type="Submit"/>
                <p>Not Having An Account</p>
                <Link to="/SignIn">SignIn</Link>
            </form>
        </>
    )
}
export default Loginn;