import './App.css'
import { Routes,Route } from 'react-router-dom';
import UploadArticle from './pages/UploadArticle'
import RouteGuard from './components/RouteGuard';
import Test from './pages/Test';
import {AuthProvider} from './context/AuthContext';
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
                path="/signin"
                element={<SignIn />}
          />
          <Route
            path='/upload'
            element={<RouteGuard><UploadArticle/></RouteGuard>}
          />
          <Route
            path='/test'
            element={<RouteGuard><Test/></RouteGuard>}
          />
      </Routes>
    </AuthProvider>
  )
}

export default App
