import {cloneElement, useContext} from 'react';
import UserContext from "../context/UserContext";
import {Redirect} from 'react-router-dom';


function Routeguard(props) {
    const [user] = useContext(UserContext);
    const {mustBeLoggedIn, redirectTo} = props;
    const condition = !!user === mustBeLoggedIn;

    return (
        <>
            {
                condition
                    ? <>
                        {
                            cloneElement(props.children, {...props})
                        }
                    </>
                    : <Redirect to={redirectTo}/>
            }
        </>
    )
};

export default Routeguard;
