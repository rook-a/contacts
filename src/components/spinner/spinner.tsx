import styles from './spinner.module.css';

interface SpinnerProps {
  className: string;
}

function Spinner({ className }: SpinnerProps): JSX.Element {
  return (
    <div className={styles['container']}>
      <div className={styles[className]}>Loading...</div>
    </div>
  );
}

export default Spinner;
