import { useState } from "react";
import Button from "../../Button/Button";

export default function PersonalClaimsPage() {
    const [articul, setArticul] = useState('');
    const [comment, setComment] = useState('');

    return (
        <form action="" onSubmit={(form) => stepHandler(form)}>

            <div className="form-field">
                <div className="row">
                    <div className="col-2">
                        <label htmlFor="contact" name="contact">Артикул:</label>
                        <input
                            type="text"
                            id="contact"
                            value={articul}
                            onChange={(e) => setArticul(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="form-field" style={{ marginBottom: '30px' }}>
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="comment" name="comment">Комментарий:</label>
                        <textarea id="comment" rows="6" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <Button
                        text="Отправить"
                        onClick={() => console.log('oh, shit! Here we go again!')}
                        fullWidth
                    />
                </div>
            </div>

        </form>
    )
}