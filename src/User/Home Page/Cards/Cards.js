import { Link } from 'react-router-dom'

function Cards({props}){


    // console.log(props);
    const x=props.map((e)=>{
        return e;
    });

    const y=x.map((e)=>{
        return (<>
            <li>{e.name}</li>
            <li>{e.image}</li>
            <li>
            <Link to={`/home/${e.name}`}>Check</Link>
            </li>
        </>
        )
    })
    
    return (
        <>
            <h1> Services</h1>
            <div className="Cards">
                <ul>
                    {y}
                </ul>
            </div>
        </>
    );
}

export default Cards;