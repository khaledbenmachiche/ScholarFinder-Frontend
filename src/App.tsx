import './App.css'
import { Routes,Route } from 'react-router-dom';
import SearchResultsPage from './pages/SearchResultsPage.tsx'
import SearchPage from './pages/SearchPage'
import UploadArticle from './pages/UploadArticle'
import WelcomePage from './pages/WelcomePage'
import FavorisPage from './pages/FavorisPage'
import {AuthProvider} from './context/AuthContext';
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import AdminModerateurPage from "./pages/AdminModerateurPage.tsx";
import DetailArticle from './pages/DetailArticle.tsx';
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
          path='/utilisateur/recherche'
          element={<SearchPage/>}
          />
          <Route
          path='/utilisateur/resultat/:searchQuery'
          element={<SearchResultsPage/>}
          />
          <Route
          path='/utilisateur/article/:id'
          element={<DetailArticle/>}
          />
          <Route
          path='/utilisateur/articles-favoris'
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