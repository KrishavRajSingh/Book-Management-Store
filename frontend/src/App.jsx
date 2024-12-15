import './App.css'
import BookList from './components/BookList'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import { useState } from 'react';
import AppBar from './components/AppBar';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const setAuthToken = (token) => {
    if(token!=null)
      localStorage.setItem('token', token);
    else 
      localStorage.removeItem('token');
  
  setToken(token);
  };

  return (
    <>
      <Router>
        <AppBar setAuthToken={setAuthToken} token={token}/>
        <div style={{}}>
          <a href="https://gsv.ac.in/" target="_blank">
            <img src='https://gsv.ac.in/wp-content/uploads/2024/11/cropped-logo_for_website-1-2.png' className="logo" alt="Vite logo" />
          </a>
          <h1>Library</h1>
        </div>
          <div>
              <Routes>
                  <Route path="/" exact element={<BookList />} />
                    {/* {token && <Route path="/add" element={<AddBook />} />}
                    {token && <Route path="/update/:id" element={<UpdateBook />} />} */}
                    <Route path="/login" element={<Login setToken={setAuthToken} />} />
                    <Route path="/register" element={<Register />} />
                  {/* <Route path="/login" element={<Login />} /> */}
              </Routes>
          </div>
        </Router>
    </>
  )
}

export default App
