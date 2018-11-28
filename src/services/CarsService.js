import axios from 'axios'; //importovali smo axios biblioteku preko koje cemo da izlistavamo podatke koji nam trebaju sa urla koji zelimo


class Cars {
    constructor() {
        //ovo nam je baseURL na koji kacimo ostale rute
        //sa tog url-a dovlacimo podatke na sajt preko axios biblioteke, u konstruktoru
        axios.defaults.baseURL = 'http://localhost:3000/api/'; //ovde mozemo bilo koji url da napisemo
    }

    //metoda koja dobavlja listu automobila sa `/api/cars`
    getAll() {
        return axios.get('cars'); //cars nam se kaci na baseURL koji smo uneli; return axios... nam vraca response i u AppCars.vue pisemo then i catch blokove
    }

    //metoda treba da prosleđuje podatke endpoint-u `/api/cars`, pozivamo je u komponenti AddCar.vue
    add(car) {
        return axios.post('cars', car); //post metodom dodajemo car, u tabelu koja se nalazi na ruti 'cars' (VALJDA?)
    }
}

export const cars = new Cars(); //importujemo ovako: import {cars} from ....
