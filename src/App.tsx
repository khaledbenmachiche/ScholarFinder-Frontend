import './App.css'
import { Routes,Route } from 'react-router-dom';
import UploadArticle from './pages/UploadArticle'
import Auth from "./pages/Auth";
import RouteGuard from './components/RouteGuard';
import Test from './pages/Test';
import {AuthProvider} from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route
            path="/auth"
            element={<Auth />}
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
