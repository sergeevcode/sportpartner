import styles from './Stars.module.css';


export default function Stars(props) {
    const STARS_COUNT = 5;
    const STARS_NOT_FILLED = STARS_COUNT - Number(props.count);

    return (
        <div className={styles.stars} style={props.style ? props.style : {}}>
            {
                [...Array(Number(props.count))].map((e, i) => (
                    <Star filled key={i}/>
                ))
            }
            {
                [...Array(STARS_NOT_FILLED)].map((e, i) => (
                    <Star key={i + 'asd'}/>
                ))
            }

            <span>{ props.reviews }</span>
        </div>
    )
}

function Star({ filled }) {
    return (
        <>
            { filled ? (
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 0L12.4037 5.79311L18.535 6.90983L14.1982 11.6069L15.084 18.0902L9.5 15.2L3.91604 18.0902L4.80178 11.6069L0.464963 6.90983L6.59634 5.79311L9.5 0Z" fill="#E2132A"/>
                </svg>
            ) : (
                <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.5 1.03179L13.2719 6.03541L13.3892 6.24711L13.628 6.28646L19.4319 7.24285L15.3428 11.2498L15.1602 11.4287L15.1984 11.6815L16.0379 17.2412L10.712 14.7472L10.5 14.6479L10.288 14.7472L4.96211 17.2412L5.80163 11.6815L5.8398 11.4287L5.65718 11.2498L1.56814 7.24285L7.37199 6.28646L7.61078 6.24711L7.72806 6.03541L10.5 1.03179Z" stroke="#E2132A"/>
                </svg>
            ) }
        </>
    )
}