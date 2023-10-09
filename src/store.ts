import { action, autorun, computed, makeObservable, observable } from 'mobx';
interface Post {
  id: number;
  title: string;
  content: string;
}
export interface User {
  id?: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  age: number;
  posts: Post[];
}

export class Store {
  users: User[];

  create(user: User) {
    const ids = this.users.map((user) => user.id) as number[];
    const max = Math.max(...ids, 1);
    this.users.push({ ...user, id: max + 1 });
    return { id: max + 1 };
  }

  read(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, data: Partial<User>) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...data,
        };
      }
      return user;
    });

    return this.users.find((user) => user.id === id);
  }

  delete(id: number) {
    this.users = this.users.filter((user) => user.id !== id);
    return { id: id };
  }

  get readAll() {
    return this.users;
  }

  logStore() {
    console.log(this.readAll);
  }

  constructor() {
    this.users = [];

    makeObservable(this, {
      users: observable,
      create: action,
      read: action,
      readAll: computed,
      update: action,
      delete: action,
    });

    autorun(() => this.logStore());
  }
}
