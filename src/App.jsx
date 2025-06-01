import { BrowserRouter } from 'react-router-dom';
import AuthPages from './pages/Auth/AuthPages';
function App() {
  return (
    <BrowserRouter>
      <AuthPages/>
    </BrowserRouter>
  )
}

export default App
