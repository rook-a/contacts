import { Link } from 'react-router-dom';

import { AppRoute } from '../../utils/const';

import styles from './header.module.css';

function Header(): JSX.Element {
  return (
    <header className={styles['header']}>
      <div className={`container ${styles['wrapper']}`}>
        <Link className={styles['logo']} to={AppRoute.Root}>
          Logo
        </Link>
        <div>
          <a href="/" className={`button ${styles['link']}`}>
            Profile
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
