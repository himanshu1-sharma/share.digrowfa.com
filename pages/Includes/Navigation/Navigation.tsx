import styles from '@/styles/Navigation.module.css'
import Link from 'next/link'

export default function Navigation() {
    return (
        <>
            <nav className={styles.navigationBg}>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-12'>
                            <div className={styles.navigationItem}>
                                <Link href='https://www.digrowfa.com/' target="_blank" rel="noopener noreferrer">
                                    <img src="/image/logo/logo.webp" alt="digrowfa_logo" width={180} height={45.92} className='img-fluid logo' />
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </nav>
        </>
    )
};
