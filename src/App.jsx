import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import './index.css';
import Preview from './pages/Preview';
import Home from './pages/Home';
import ProtectedRoute from './pages/ProtectedRoute';
import Template from './pages/Template';
import ProtectedAdminRoute from './pages/ProtectedAdminRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor/:id/:slug" element={<Editor />} />
        </Route>

        <Route element={<ProtectedAdminRoute />}>
          <Route path="/template" element={<Template />} />
        </Route>

        <Route path="/preview/:slug" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;