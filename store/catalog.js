import { makeAutoObservable, makeObservable, observable, computed, action, flow } from "mobx"
import { API_URL } from "../constants";
import axios from 'axios';

import { SORTING_TYPES } from '../lib/constants';

class Catalog {
    items = [];
    page = 1;
    groupCode;
    searchText;
    searchCount = 0;
    sorting = Object.keys(SORTING_TYPES)[0];

    constructor() {
        makeAutoObservable(this)
        // makeObservable(this, {
        //     value: observable,
        //     double: computed,
        //     increment: action,
        //     fetch: flow
        // })
        // this.value = value
    }

    setPage(page) {
        this.page = page;
    }

    setSorting(sortingType) {
        this.sorting = sortingType;
    }

    setGroupCode(group) {
        this.groupCode = group;
    }

    setSearchText(text) {
        this.searchText = text;
    }

    async fetchShopItems() {
        // this.items = [];
        let fetchLink;

        if (!this.groupCode) {
            fetchLink = `${API_URL}/api/catalog/catalog?PAGE=${this.page}&SORT=${this.sorting}${this.searchText ? ('&SEARCH=' + this.searchText) : ''}`;
        } else {
            fetchLink = `${API_URL}/api/catalog/${this.groupCode}/items?PAGE=${this.page}&SORT=${this.sorting}`;
        }

        //const catalogItemsRes = await fetch(`${API_URL}/api/catalog/catalog?PAGE=${page}`);
        const catalogItemsResAxios = await axios.get(fetchLink);
        const catalogItems = await catalogItemsResAxios.data;
        //const catalogItems = await catalogItemsRes.json();

        this.items = catalogItems;

        return true;
    }
}

// class TodoList {
//     @observable todos = []
//
//     @computed
//     get unfinishedTodoCount() {
//         return this.todos.filter(todo => !todo.finished).length
//     }
//
//     constructor() {
//         makeObservable(this)
//     }
// }

export default new Catalog();