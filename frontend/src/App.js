import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css';
import Join from './components/join/Join';
import { createContext, useState } from 'react';
import Chat from './components/chats/Chat';

const myContext=createContext();
function App() {

 
  const [user,setUser]=useState();
  return (
    <BrowserRouter>
       <myContext.Provider value={{user,setUser}}>
        <Routes>
          <Route path='/' element={<Join/>}/>
          <Route path='/chat' element={<Chat/>}/>

        </Routes>
        </myContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export {myContext}