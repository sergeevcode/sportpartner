import { makeAutoObservable, makeObservable, observable, computed, action, flow } from "mobx"
import { API_URL, phoneRe, emailRe } from "../constants";
import axios from 'axios';

class User {
    isAuthorized = false;
    id;
    firstName;
    lastName;
    email;
    token;

    constructor() {
        makeAutoObservable(this);
        // this.checkAuthorized();
    }

    setIsAuthorized(bool) {
        this.isAuthorized = bool;
    }

    checkAuthorized = async () => {
        const data = await fetch(`/api/user`, { method: 'POST' });

        const json = await data.json();

        this.isAuthorized = json.isLoggedIn;
        if (json.isLoggedIn) {
            this.setUserInfo({
                id: json.user.id,
                firstName: json.user.first_name,
                lastName: json.user.last_name,
                email: json.user.email,
                token: json.user.token,
            });
        }

    };

    // get isAuthorized() {
    //     if (this.isAuthorized) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }


    setUserInfo(user) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.token = 'test';
    }

    getUserInfo() {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            token: this.token,
        }
    }
}

export default new User();