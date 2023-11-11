import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './routes/Home'
import Create from './routes/Create'
import Post from './routes/Post'
import Update from './routes/Update'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {


  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
