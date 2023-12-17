import { useNavigate } from 'react-router-dom';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
const Test = () => {
  const api = useAxios();
  const {logout} = useAuth()
  const navigate = useNavigate();
    const handleClickEvent = () => {
        console.log('clicked');
        api.get('/userView').then((res) => {
            console.log(res.data);
        }).catch(err=>console.log(err))
    }
    const handleLogout = ()=>{
        logout()
        .then(state=>{
          if(state){
            console.log('logged out');
            navigate('/signin');
          }
        })
    }
  return (
    <>
    <button onClick={handleClickEvent}>Test</button>
    <button onClick={handleLogout}> logout</button>
    </>
  )
}

export default Test