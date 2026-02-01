/**
 * Компонент Preloader — прелоадер сайта
 * 
 * @description Анимированный прелоадер, показывается при загрузке сайта
 */

import { useState, useEffect } from 'react';
import styles from './Preloader.module.css';

interface PreloaderProps {
  /** Минимальное время показа в мс */
  minDuration?: number;
}

const Preloader = ({ minDuration = 1500 }: PreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => setIsVisible(false), 400);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration]);

  if (!isVisible) return null;

  return (
    <div className={`${styles.preloader} ${isFading ? styles['preloader--fading'] : ''}`}>
      <div className={styles.preloader__content}>
        <img 
          src="/images/logo.png" 
          alt="Стеклопром" 
          className={styles.preloader__logo}
        />
        <div className={styles.preloader__spinner}>
          <div className={styles.preloader__dot}></div>
          <div className={styles.preloader__dot}></div>
          <div className={styles.preloader__dot}></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
