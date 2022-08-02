import styles from './Modal.module.css';


export default function Modal({ children, width='700px' }) {
    return (
        <div className={styles.modal} >
            <div className={styles.inner} style={{ maxWidth: width }}>
                { children }
            </div>
        </div>
    )
};