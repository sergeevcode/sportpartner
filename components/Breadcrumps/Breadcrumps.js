import styles from './Breadcrumps.module.css';
import Link from "next/link";

export default function Breadcrumps({ items }) {
    return (
        <div className={styles.breadcrumps}>
            <Link href="/">Главная </Link>
            { items.map((item, i) => (
                <div key={i} style={{ display:'inline' }}>
                    {
                        item.link ? (
                            <>
                                / <Link href={item.link} key={i}><a>{item.title} </a></Link>
                            </>
                        ) :
                        (
                            <>
                                / <span> {item.title}</span>
                            </>
                        )
                    }
                </div>

            )) }
        </div>
    );
}