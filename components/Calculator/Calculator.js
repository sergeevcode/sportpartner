import styles from './Calculator.module.css';
import Image from 'next/image';

import { API_URL } from "../../constants";
import TitleArrows from "../TitleArrows/TitleArrows";

export default function Calculator() {
    return (
        <section>
            <div className="container">
                <div className={styles.wrap}>
                    <div className="d-flex justify-content-between">
                        <Image
                            src={`${API_URL}/images/calculator_bg.png`}
                            width={722}
                            height={695}
                        />
                        <div className={ styles.form }>
                            <h2 className="section-title" style={{ margin: '0 0 30px' }}>
                                Оптовый <TitleArrows size="sm" count={3} colored={[3, 2]} style={{ transform: 'rotate(180deg) translate(12px, 6px)' }}/><br/>Калькулятор
                            </h2>
                            <p style={{ maxWidth: '330px' }}>Заполните данные и узнайте вашу прибыль при оптовой закупке!</p>

                            <form action="">
                                <div className="form-field">
                                        <label htmlFor="#items">Товар</label>
                                        <div className="select">
                                            <select name="items" id="items">
                                                <option value="Гриф гантельный 31х6">Гриф гантельный 31х1</option>
                                                <option value="Гриф гантельный 31х6">Гриф гантельный 31х2</option>
                                                <option value="Гриф гантельный 31х6">Гриф гантельный 31х3</option>
                                                <option value="Гриф гантельный 31х6">Гриф гантельный 31х4</option>
                                                <option value="Гриф гантельный 31х6">Гриф гантельный 31х5</option>
                                                <option value="Гриф гантельный 31х6">Гриф гантельный 31х6</option>
                                            </select>
                                        </div>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="#zakup">Сумма закупа</label>
                                    <input type="text" placeholder="Введите сумму закупа" id="zakup"/>
                                </div>
                                <div className="form-field">
                                    <label htmlFor="#realize">Сумма реализации</label>
                                    <input type="text" placeholder="Введите сумму реализации" id="realize"/>
                                </div>
                            </form>

                            <div className={styles.result}>
                                Ваша прибыль: <span>950 000 ₽</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}