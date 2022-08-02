// import { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';
// import {API_URL} from "../../constants";

import styles from './TitleArrows.module.css';

export default function TitleArrows({ size='sm', count=1, colored=[1], style }) {

    // const COLOR = colored.includes ? '#E2132A' : '#131313';
    const WIDTH = size === 'sm' ? '28' : '38';
    const HEIGHT = size === 'sm' ? '46' : '62';
    const VIEWBOX = size === 'sm' ? '0 0 28 46' : '0 0 38 62';
    const PATHD = size === 'sm' ? 'M3 3L23 23L3 43' : 'M4 4L31 31L4 58';
    const STROKEWIDTH = size === 'sm' ? '6.66667' : '9';

    return (
        <div className={styles.arrow} style={style}>
            { [...Array(count)].map((e, i) => (
                <svg width={WIDTH} height={HEIGHT} viewBox={VIEWBOX} fill="none" xmlns="http://www.w3.org/2000/svg" key={i}>
                    <path d={PATHD} stroke={colored.includes(i + 1) ? '#E2132A' : '#131313'} strokeWidth={STROKEWIDTH}/>
                </svg>
            )) }
        </div>
    )
};


