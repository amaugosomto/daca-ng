import React, {useEffect, useState} from 'react'
import Header from './Header';
import Footer from './Footer';
import { useRouter} from 'next/router';
import styles from '../../styles/Home.module.scss'

export default function Layout({ children }) {
  const [flipImage, setFlipImage] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
      flipLoader();
  });

  const flipLoader = () => {
    
    if (router.pathname == '/' && !pageLoaded){
      setFlipImage({...flipImage, flipImage: true});
      setTimeout(function () {
        setPageLoaded({...pageLoaded, pageLoaded: true});
      }, 1000);
    }
    
  }

  return (
    <div>
      <div>
        <div className={ router.pathname == "/" ? pageLoaded ? styles.hide : '' : styles.hide}>
          <div style={{position:'relative', height:'100vh', width:'100vw'}}>
            
            <div className={styles.loader}>
              <img src="/images/daca-logo.png" className={flipImage ? styles.rotating : ''} alt="daca logo"/>
            </div>
          </div>
        </div>
      </div>

      <div className={ router.pathname == "/" ? pageLoaded ? styles.show : styles.hide : ''}>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  )
}29