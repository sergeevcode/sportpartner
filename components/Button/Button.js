import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { API_URL } from "../../constants";

import styles from './Button.module.css';

export default function Button({ href = null, text, height = 62, fullWidth = false, onClick = false, disabled = false }) {
    return (
        <BtnLayout href={href} fullWidth={fullWidth} onClick={onClick} disabled={disabled}>
            {text}
        </BtnLayout>
    )
};

function BtnLayout({ children, href, fullWidth, onClick, disabled }) {
    return (
        <div className={styles.btnWrap} >
            {href ?
                <Link href={href}>
                    <a className={styles.btn} style={fullWidth ? { width: '100%' } : {}}>{children}</a>
                </Link>
                :
                <button className={styles.btn} onClick={onClick ? onClick : ''} style={fullWidth ? { width: '100%' } : {}} disabled={disabled}>
                    {children}
                </button>
            }
        </div>
    );
}