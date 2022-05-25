import UserList from '../../components/user-list/user-list';
import styles from './main.module.css';

function Main(): JSX.Element {
  return (
    <main className="container">
      <h1 className={styles['title']}>Contacts</h1>

      <UserList />
    </main>
  );
}

export default Main;
