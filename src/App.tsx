import UserList from './UserList';
import { Store } from './store';

function App() {
  const store = new Store();
  return (
    <div className="App">
      <UserList store={store} />
    </div>
  );
}

export default App;
