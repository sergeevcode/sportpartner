import { useState } from "react";

import styles from './SeoText.module.css';
import TitleArrows from "../TitleArrows/TitleArrows";
import TextLink from "../TextLink/TextLink";

export default function SeoText({ title, text }) {
    const [isOpened, setIsOpened] = useState(false);
    const [buttontext, setButtonText] = useState("Читать дальше");

    const handleOpen = () => {
        setIsOpened(!isOpened);
        setButtonText(!isOpened ? "Скрыть" : "Читать дальше");
    };

    return(
        <section>
            <div className="container">
                <h2 className="section-title" style={{ margin: '0 0 20px' }}>
                    { title }
                </h2>

                <div className={styles.text} style={ !isOpened ? { height: '66px'} : {} }>
                    <div dangerouslySetInnerHTML={{__html: text}} />
                </div>

                <div onClick={() => handleOpen()}>
                    <TextLink text={buttontext}/>
                </div>
            </div>
        </section>
    );
}