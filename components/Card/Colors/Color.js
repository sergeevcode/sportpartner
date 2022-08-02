import styles from './Color.module.css';

export default function Color({ color, active, setColor, colorName = null }) {
    return (
        <div
            onClick={() => setColor()}
            style={{ display: 'inline-flex', alignItems: 'center' }}
            className={styles.colorWrap}
        >
            <div
                className={active ? styles.colorActive : styles.color}
                style={{
                    backgroundColor: '#' + color,
                    border: color === 'fff' || color === 'FFFFFF' ? '1px solid #d4d4d4' : 'none'
                }}
            />
            { colorName && <span className={active ? styles.colorNameActive : styles.colorName}>{colorName}</span> }
        </div>
    )
}