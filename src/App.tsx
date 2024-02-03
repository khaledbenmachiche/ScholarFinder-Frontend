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
import RouteGuard from './components/RouteGuard.tsx';
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
          element={<RouteGuard roles={['User']}><SearchPage/></RouteGuard>}
          />

          <Route
          path='/resultat-de-recherche/:searchQuery'
          element={<RouteGuard roles={['User']}><SearchResultsPage/></RouteGuard>}
          />

          <Route
          path='/article/:id'
          element={<RouteGuard roles={['User']}><DetailArticle/></RouteGuard>}
          />

          <Route
          path='/articles-favoris'
          element={<RouteGuard roles={['User']}><FavorisPage /></RouteGuard>}
          />
       
          <Route
              path='/admin/dashboard'
              element={<RouteGuard roles={['Admin']}><AdminDashborad /></RouteGuard>}
          />
          <Route
              path='/admin/upload-article'
              element={<RouteGuard roles={['Admin']}><UploadArticle /></RouteGuard>}
          />
          <Route
              path='/admin/moderateur'
              element={<RouteGuard roles={['Admin']}><AdminModerateurPage /></RouteGuard>}
          />
          <Route
              path='/moderateur/update_article/:id'
              element={<RouteGuard roles={['Mod']}><ArticleUpdate /></RouteGuard>}
          />
          <Route
              path='/moderateur/all_articles'
              element={<RouteGuard roles={['Mod']}><NonValidateArticlesModerateurPage/></RouteGuard>}
          />
      </Routes>
    </AuthProvider>
);
}