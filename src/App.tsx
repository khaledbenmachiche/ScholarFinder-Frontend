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
import NonValidateArticlesModerateurPage from './pages/NonValidateArticlesModerateurPage.tsx';
import DetailArticle from './pages/DetailArticle.tsx';
import ArticleUpdate from './pages/ArticleUpdate.tsx';
import { AdminDashborad } from './pages/AdminDashborad.tsx';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
          <Route
            path='/'
            element={<WelcomePage />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
                path="/signin"
                element={<SignIn />}
          />

          <Route
          path='/rechercher-article'
          element={<SearchPage/>}
          />

          <Route
          path='/resultat-de-recherche/:searchQuery'
          element={<SearchResultsPage/>}
          />

          <Route
          path='/article/:id'
          element={<DetailArticle/>}
          />

          <Route
          path='/articles-favoris'
          element={<FavorisPage />}
          />
       
          <Route
              path='/admin/dashboard'
              element={<AdminDashborad />}
          />
          <Route
              path='/admin/upload-article'
              element={<UploadArticle />}
          />
          <Route
              path='/admin/moderateur'
              element={<AdminModerateurPage />}
          />
          <Route
              path='/moderateur/update_article/:id'
              element={<ArticleUpdate />}
          />
          <Route
              path='/moderateur/all_articles'
              element={<NonValidateArticlesModerateurPage/>}
          />
      </Routes>
    </AuthProvider>
);
}