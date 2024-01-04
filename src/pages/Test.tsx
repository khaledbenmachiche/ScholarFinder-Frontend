import {useNavigate} from 'react-router-dom';
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
        }).catch(err => console.log(err))
    }
    const handleLogout = () => {
        logout()
            .then(state => {
                if (state) {
                    console.log('logged out');
                    navigate('/signin');
                }
            })
    }
    return (
        <div className="flex flex-col ">

            <div className="fixed flex justify-between w-screen p-2 bg-blue-500">
                <button className="text-white " onClick={handleClickEvent}>Navbar</button>
                <button className="text-white" onClick={handleLogout}>Logout</button>
            </div>
            <iframe
                src={`http://127.0.0.1:5173/baiche2019.html`}
                title="HTML File"
                className="w-screen h-screen"
            />
        </div>
    )
}

export default Test