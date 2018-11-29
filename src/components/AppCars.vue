<template>
    <div class="container">
        <br>
        <h1>Cars List</h1>
        <br>
        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">Brand</th>
                    <th scope="col">Model</th>
                    <th scope="col">Year</th>
                    <th scope="col">Max Speed</th>
                    <th scope="col">Is Automatic</th>
                    <th scope="col">Engine</th>
                    <th scope="col">Number Of Doors</th>
                    <th scope="col">Edit Car Info</th>
                    <th scope="col">Delete Car</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(car, index) in cars" :key="index">
                    <td>{{car.brand}}</td>
                    <td>{{car.model}}</td>
                    <td>{{car.year}}</td>
                    <td>{{car.maxSpeed}}</td>
                    <td>{{car.isAutomatic}}</td>
                    <td>{{car.engine}}</td>
                    <td>{{car.numberOfDoors}}</td>

                    <td>
                        <router-link :to="{name: 'edit-car', params: {id: car.id}}">
                            <button type="button" class="btn btn-light">Edit</button>
                        </router-link>
                    </td>

                    <td>
                        <!--fnc deleteCar(car.id) - moramo da joj prosledimo car.id da znamo koji auto brisemo-->
                        <button @click="deleteCar(car.id)" class="btn btn-danger">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>

import {cars} from '../services/CarsService.js';

export default {
    data() {
        return {
            cars: [], //cars nam je inicijalno prazan niz dok ne dovucemo cars iz axios biblioteke
        }
    },

    //HOOK i Promise
    //created hook - u njemu pisemo promise; hook ne pozivamo, on nam sam vraca sva kola koja smo uneli
    created() {
        cars.getAll()
            .then(response => {
                this.cars = response.data; //response - vraca listu kola
            })
            .catch(error => {
                console.log(error); //catch nismo ni morali da pisemo
            });
    },

    methods: {
        //brisemo auto sa tim 'id'
        deleteCar(id) {
            cars.delete(id) //pozivamo fnc iz carsService
                .then(response => {
                    this.cars = this.cars.filter(car => { //filtriramo kola
                        return car.id != id; //i vracamo listu kola bez kola koja imaju taj id, a koja smo obrisali(car.id != id)
                    });
                })
                .catch(error => { //catch ne mora
                    console.log(error);
                })
        }
    },

}
</script>

<style>

.container .table tr th {
    color: #007bff;
}

.container .table tr td {
    color: #e6f1ff;
}

.container .table tbody tr:hover {
    background-color: #394047;
}

</style>
