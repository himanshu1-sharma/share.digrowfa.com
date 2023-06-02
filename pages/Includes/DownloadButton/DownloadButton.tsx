import styles from '@/styles/DownloadButton.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function DownloadButton() {
    return (
        <>
            <div className={styles.downloadButton}>
                <Link href="https://apps.apple.com/in/app/digrowfa/id1667079351" target="_blank" rel="noopener noreferrer">
                    <div className={styles.homeHeaderStorBtn}>
                        <div className={styles.storeImg}>
                            <Image src="/image/icons/apple.png" alt="apple" width={37} height={43} className='img-fluid' />
                        </div>
                        <div className={styles.storeName}>
                            <span>Download on the</span>
                            <p>App Store</p>
                        </div>
                    </div>
                </Link>
                <Link href="https://play.google.com/store/apps/details?id=com.digrowfa.digrowfa" target="_blank" rel="noopener noreferrer">
                    <div className={styles.homeHeaderStorBtn}>
                        <div className={styles.storeImg}>
                            <Image src="/image/icons/playStore.png" alt="playStore" width={37} height={43} className='img-fluid' />
                        </div>
                        <div className={styles.storeName}>
                            <span>GET IT ON</span>
                            <p>Google Play</p>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
};
