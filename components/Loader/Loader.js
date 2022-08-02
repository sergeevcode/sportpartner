export default function Loader({ style }) {
    return (
        <div style={{ width: '100%', padding: '150px 0', ...style }} className="d-flex justify-content-center">
            <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}