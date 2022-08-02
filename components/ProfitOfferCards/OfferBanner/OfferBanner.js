import styles from './OfferBanner.module.css';

export default function OfferBanner({ background, title, description, small = false, style = {} }) {
    return (
        <div style={{ height: '100%', paddingBottom: '20px' }}>
            <div
                className={small ? styles.offerSm : styles.offer}
                style={{
                    backgroundImage: `url(${background})`,
                    ...style
                }}
            >
                <div className={styles.title}>
                    {title}
                </div>
                <div className={styles.description}>
                    {description}
                </div>
            </div>
        </div>
    );
}