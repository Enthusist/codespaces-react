import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Pathways from './pages/Pathways';
import PathwayDetail from './pages/PathwayDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="results" element={<Results />} />
          <Route path="pathways" element={<Pathways />} />
          <Route path="pathway/:id" element={<PathwayDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
