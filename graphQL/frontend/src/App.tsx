import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";
import { PostsPage } from "./pages/PostsPage";
import { PostDetailPage } from "./pages/PostDetailPage";
import { PostFormPage } from "./pages/PostFormPage";
import { UsersPage } from "./pages/UsersPage";
import { TrendingPage } from "./pages/TrendingPage";
import "./App.css";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div className="app">
          <nav className="navbar">
            <div className="nav-brand">
              <span className="nav-logo">⚡</span>
              <strong>GraphQL Challenge</strong>
            </div>
            <div className="nav-links">
              <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Posts
              </NavLink>
              <NavLink to="/trending" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                🔥 Trending
              </NavLink>
              <NavLink to="/users" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
                Usuários
              </NavLink>
            </div>
          </nav>

          <main className="main">
            <Routes>
              <Route path="/" element={<PostsPage />} />
              <Route path="/post/:id" element={<PostDetailPage />} />
              <Route path="/create" element={<PostFormPage />} />
              <Route path="/edit/:id" element={<PostFormPage />} />
              <Route path="/trending" element={<TrendingPage />} />
              <Route path="/users" element={<UsersPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
