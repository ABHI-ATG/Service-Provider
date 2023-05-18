import { useLocation } from "react-router-dom";

const Services=()=>{
    const location=useLocation();
    const name=location.pathname.slice(9);
    return (
        <>
            <h1>{name}</h1>
        </>
    )
}
export default Services;