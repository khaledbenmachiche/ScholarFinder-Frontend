import './App.css'
import { Routes,Route } from 'react-router-dom';
import UploadArticle from './pages/UploadArticle'
import Auth from "./pages/Auth";
import RouteGuard from './components/RouteGuard';

function App() {
  return (
    <Routes>
      <Route
        path="/auth"
        element={<Auth />}
      />
      <Route
        path='/upload'
        element={<RouteGuard><UploadArticle/></RouteGuard>}
      />
    </Routes>
  )
}

export default App
