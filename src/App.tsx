import './App.css'
import { Routes,Route } from 'react-router-dom';
import SearchPage from './pages/SearchResultsPage.tsx'
import UploadArticle from './pages/UploadArticle'
import WelcomePage from './pages/WelcomePage'
import FavorisPage from './pages/FavorisPage'
import {AuthProvider} from './context/AuthContext';
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
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
          path='/utilisateur/resultat'
          element={<SearchPage/>}
          />
          <Route
          path='/utilisateur/article-facoris'
          element={<FavorisPage/>}
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