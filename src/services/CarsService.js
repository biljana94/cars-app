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

    //sa endpoint-a `/api/cars/{id}` dobaviti podatke o automobilu na osnovu prosleđenog iparametra `id`
    get(id) {
        return axios.get(`cars/${id}`); //sa rute 'cars' pomocu metode get(id) dobavljamo 'id'
                        //moramo ovako pisati da bi sa rute cars dobili specifican 'id' ${id} ===> `cars/${id}`
    }

    //metoda koja menja kola u formi - put()
    //prima id automobila koji se edit-uje, i prosledjuje na endpoint `/api/cars/{id}`
    edit(id, car) {
        return axios.put(`cars/${id}`, car); // `cars/${id}` => preko rute gadjamo cars sa nekim id, i ta kola(car) koja hocu da menjam
                    //preko PUT menjamo neki element
    }

    //metoda brise auto preko id
    //prosleđeni id poslati na endpoint `api/cars/{id}` i time obrisati automobil iz liste
    delete(id) {
        return axios.delete(`cars/${id}`); //preko rute saljemo 'id' kola koje brisemo iz liste
    }
}

export const cars = new Cars(); //importujemo ovako: import {cars} from ....
