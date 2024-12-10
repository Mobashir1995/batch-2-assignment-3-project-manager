import 'react-toastify/dist/ReactToastify.css';
import Header from './header/header'
import Content from './content/content'
import { ContextProvider } from './context/context-provider'

function App() {
  return (
    <ContextProvider>
      <Header />
      <Content />          
    </ContextProvider>
  )
}

export default App