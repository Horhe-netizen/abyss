import Board from '@/components/Board';
import TreeContextProvider from './components/TreeContextProvider';

function App() {
  return (
    <TreeContextProvider>
      <Board />
    </TreeContextProvider>
  )
}

export default App
