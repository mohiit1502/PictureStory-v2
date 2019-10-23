import React from 'react';
import styles from './PageLoader.module.scss';

const PageLoader = props => {
  return (
      <div className={styles['c-PageLoader']}>
        <div className={styles['is-animate']}>
          <div className={styles.l}>l</div>
          <div className={styles.l}>o</div>
          <div className={styles.l}>a</div>
          <div className={styles.l}>d</div>
          <div className={styles.l}>i</div>
          <div className={styles.l}>n</div>
          <div className={styles.l}>g</div>
        </div>
      </div>
  )
};

PageLoader.defaultProps = {

};

PageLoader.propTypes = {

};

export default PageLoader;