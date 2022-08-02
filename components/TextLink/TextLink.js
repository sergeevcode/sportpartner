import styles from "../TextLink/TextLink.module.css";
import Link from "next/link";

export default function TextLink({ href, text, style, onClick }) {
    return(
        <>
            { href ? (
                <Link href={href}>
                    <a className={styles.link} style={style}>{text}</a>
                </Link>
            ) : (
                <div className={styles.link} style={style} onClick={onClick}>{text}</div>
            ) }

        </>
    );
}