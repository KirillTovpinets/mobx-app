import { observer } from 'mobx-react-lite';
import {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  useEffect,
  useState,
} from 'react';
import { Store, User } from './store';

function UserList({ store }: { store: Store }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((data) => data.json())
      .then((list) =>
        list.forEach((element: User) => {
          store.create(element);
        })
      );
  }, []);
  const handleAddUser = () => {
    const newUser: User = {
      name: 'Kirill',
      username: 'Tovpinets',
      email: 'mail@mail.com',
      phone: '00000',
      website: 'http://localhost',
      age: 29,
      posts: [],
    };
    store.create(newUser);
  };

  const handleEditItem: (id: number) => MouseEventHandler<HTMLLIElement> =
    (id: number): MouseEventHandler<HTMLLIElement> =>
    (event: MouseEvent) => {
      setSelectedId(id);
      setShowEditForm(true);
    };

  const handleSaveNewName = () => {
    store.update(selectedId!, { name: newName });
    setShowEditForm(false);
  };
  return (
    <div>
      <ul>
        {store.readAll.map((item) => (
          <li key={item.id} onDoubleClick={handleEditItem(item.id!)}>
            {item.name} {item.username}
          </li>
        ))}
      </ul>
      <div>
        {showEditForm && (
          <div>
            <input
              type="text"
              value={newName}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setNewName(event.target.value)
              }
            />
            <button onClick={handleSaveNewName}>Save</button>
          </div>
        )}
      </div>
      <button onClick={handleAddUser}>AddUser</button>
    </div>
  );
}

export default observer(UserList);
