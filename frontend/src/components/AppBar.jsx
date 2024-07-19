import { useNavigate } from "react-router-dom"
import PropTypes from 'prop-types';

const AppBar = ({ token, setAuthToken}) => {
    const navigate = useNavigate();

    return<>
        <nav>
          <ul style={{display: 'flex', justifyContent: 'space-evenly'}}>
            {token ? <button onClick={()=>setAuthToken(null)}>Logout</button> :
            <>
            <button onClick={()=>navigate('/login')}>Login</button>
            <button onClick={()=>navigate('/register')}>Register</button>
            </>}
          </ul>
      </nav>
    </>
}
AppBar.propTypes = {
    token: PropTypes.string,
    setAuthToken: PropTypes.func.isRequired
}
export default AppBar