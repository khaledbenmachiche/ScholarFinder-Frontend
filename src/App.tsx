import './App.css'
import { Routes,Route } from 'react-router-dom';
import UploadArticle from './pages/UploadArticle';
import Test from './pages/Test';
import {AuthProvider} from './context/AuthContext';
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import WelcomePage from "./pages/WelcomePage.tsx";
import AdminModerateurPage from "./pages/AdminModerateurPage.tsx";
export default function App() {
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
            path='/test'
            element={<Test/>}
          />
        <Route
          path='/'
          element={<WelcomePage/>}
          />
          <Route
              path='/admin/dashboard'
              element={<WelcomePage/>}
          />
          <Route
              path='/admin/upload-article'
              element={<UploadArticle/>}
          />
          <Route
              path='/admin/moderateur'
              element={<AdminModerateurPage/>}
          />
      </Routes>
    </AuthProvider>
);
}