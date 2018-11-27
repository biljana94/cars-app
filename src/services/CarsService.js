import axios from 'axios'; //importovali smo axios biblioteku preko koje cemo da izlistavamo podatke koji nam trebaju


class Cars {
    constructor() {
        axios.defaults.baseURL = 'http://localhost:3000/api/';
    }

    //metoda koja dobavlja listu automobila sa `/api/cars`
    getAll() {
        return axios.get('cars'); //cars nam se kaci na baseURL koji smo uneli; return axios... nam vraca response i u AppCars.vue pisemo then i catch blokove
    }
}

export const cars = new Cars(); //importujemo ovako: import {cars} from ....
