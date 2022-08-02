import { makeAutoObservable, makeObservable, observable, computed, action, flow } from "mobx"
import { API_URL, phoneRe, emailRe } from "../constants";
import axios from 'axios';

class Checkout {
    step = 1;

    validatedSteps = {
        1: false,
        2: false,
        3: false,
        4: false
    };

    contacts = {
        status: '',
        name: '',
        phone: '',
        email: ''
    };

    address = {
        country: '',
        city: '',
        address: '',
        comment: ''
    };

    delivery = {
        type: '',
        point: ''
    };

    paymentType = {
        type: '',
        text: '',
        description: ''
    };

    constructor() {
        makeAutoObservable(this)
    }

    setValidatedStep(step) {
        this.validatedSteps = {
            ...this.validatedSteps,
            [step]: true
        }
    }

    setStep(step) {
        this.step = step;
    }

    setContacts(contacts) {
        this.contacts = contacts;
        this.validateContacts();
    }

    setAddress(address) {
        this.address = address;
        this.validateAddress();
    }

    setDelivery(delivery) {
        this.delivery = delivery;
    }

    setPaymentType(paymentType) {
        this.paymentType = paymentType;
    }

    validateContacts() {
        const phoneRe = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
        const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (
            this.contacts.status &&
            this.contacts.name && this.contacts.name.length > 2 &&
            this.contacts.phone && phoneRe.test(this.contacts.phone) &&
            this.contacts.email && emailRe.test(this.contacts.email)
        ) {
            this.setValidatedStep(1);
            this.setStep(2);

            return true;
        }
    }

    get deliveryType() {
        return {
            type: {
                key: this.delivery.type.key,
                name: this.delivery.type.name,
            }

        }
    }

    get pointType() {
        return {
            name: this.delivery.point.name,
            price: this.delivery.point.price
        }
    }

    validateAddress() {
        if (
            this.address.country &&
            this.address.city &&
            this.address.address
        ) {
            this.setValidatedStep(2);
            this.setStep(3);

            return true
        }
    }
}

export default new Checkout();