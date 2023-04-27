import {Link} from 'react-router-dom';

const SignInn=()=>{
    return (
        <>
            <form>
                <input type="text" placeholder="Name"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Password"/>
                <input type="password" placeholder="Confirm-Password"/>
                <input type="Submit"/>
                <p>Having an Account?</p>
                <Link to="/Login">LogIn</Link>
            </form>
        </>
    )
}
export default SignInn;