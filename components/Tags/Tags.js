import Link from 'next/link';

import styles from './Tags.module.css';

export default function Tags() {
    return(
        <section className={styles.tagsWrap}>
            <div className="container">
                <h3 className={styles.title}>С этими товарами ищут</h3>

                <div className="d-flex flex-wrap">

                    <Tag text="Железо" href="#" />
                    <Tag text="Спорт дома" href="#" />
                    <Tag text="Штанги" href="#" />
                    <Tag text="Грифы" href="#" />
                    <Tag text="Гантели" href="#" />
                    <Tag text="Железо" href="#" />
                    <Tag text="Спорт дома" href="#" />
                    <Tag text="Штанги" href="#" />
                    <Tag text="Грифы" href="#" />
                    <Tag text="Гантели" href="#" />
                </div>
            </div>
        </section>
    );
}

function Tag({ text, href }) {
    return(
        <Link href={href}>
            <div className={styles.tag}>
                <a>{text}</a>
            </div>
        </Link>
    );
}