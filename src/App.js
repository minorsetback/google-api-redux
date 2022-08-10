import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBooks from './components/HomePage/SearchBooks';
import Book from './components/ViewBook/Book';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SearchBooks />} />
          <Route path='/:id' element={<Book />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
