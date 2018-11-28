<template>
    <div class="container">
        <div class="row justify-content-md-center">

            
            <!--FORMA ZA UNOS NOVIH KOLA-->
            <form @submit.prevent="addCar()">
                <br>
                <div class="form-group row">
                    <label>Brand</label>
                    <input v-model="newCar.brand" class="form-control" type="text" placeholder="Enter brand">
                </div>

                <div class="form-group row">
                    <label>Model</label>
                    <input v-model="newCar.model" class="form-control" type="text" placeholder="Enter model">
                </div>

                <div class="form-group row">
                    <label>Year</label>
                    <select v-model="newCar.year" class="custom-select">
                        <!--v-for - iteriramo kroz niz years, mora i :value="" jer inace nece prepoznati niz-->
                        <option v-for="(year, index) in years" :value="year" :key="index">{{year}}</option>
                    </select>
                </div>

                <div class="form-group row">
                    <label>Max Speed</label>
                    <input v-model="newCar.maxSpeed" class="form-control" type="number" placeholder="Enter max speed">
                </div>

                <!--checkbox-->
                <div class="form-group row">
                    <div class="form-check">
                        <input v-model="newCar.isAutomatic" class="form-check-input" type="checkbox">
                        <label id="automatic" class="form-check-label">Is Automatic</label>
                    </div>
                </div>

                <!--radio buttons-->
                <div class="form-group col">
                    <label>Engine</label>
                    
                    <div class="form-check">
                        <!--moramo pisati value u radio buttons! ako ne budemo pisali, kad kliknemo 1 button, obelezice sve-->
                        <input v-model="newCar.engine" value="Diesel" class="form-check-input" type="radio">
                        <label class="form-check-label">Diesel</label>
                    </div>

                    <div class="form-check">
                        <input v-model="newCar.engine" value="Petrol" class="form-check-input" type="radio">
                        <label class="form-check-label">Petrol</label>
                    </div>

                    <div class="form-check">
                        <input v-model="newCar.engine" value="Electric" class="form-check-input" type="radio">
                        <label class="form-check-label">Electric</label>
                    </div>

                    <div class="form-check">
                        <input v-model="newCar.engine" value="Hybrid" class="form-check-input" type="radio">
                        <label class="form-check-label">Hybrid</label>
                    </div>
                </div>

                <div class="form-group row">
                    <label>Number Of Doors</label>
                    <input v-model="newCar.numberOfDoors" class="form-control" type="number" placeholder="Enter number of doors">
                </div>

                

                <button type="submit" class="btn btn-primary">Add car</button>
            </form>

        </div>
    </div>
</template>


<script>

import {cars} from '../services/CarsService.js';
import AppCars from './AppCars.vue';

export default {
    data() {
        return {
            //niz years za select box
            //napravi sam niz od 30 elemenata(2019 - 1990).fill(popunjava niz od 1990).map(num, index - trenutni element=1990 i index=0)
                //svaki put sabira sa 1990 index sledeceg elementa(npr: 1990+0, 1990+1, 1990+2...)
                //num je uvek isti(1990), a index povecava svaki put za +1
            years: Array(2019 - 1990).fill(1990).map((num, index) => num + index),

            newCar: {
                isAutomatic: false, //default - menjamo ga na true kad cekiramo - v-model
            },
        }
    },

    methods: {
        //metoda kojom isto mozemo da ispisemo years, samo kad pisemo v-for za iteriranje kroz niz cars moramo da je pozivamo ovako:
                            //v-for="(year, index) in years()" :value="year" :key="index" - sa zagradama
        // years() {
        //     let years = [];
        //     for(let i = 1990; i <= 2018; i++) {
        //         years.push(i);
        //     }
        // }

        //dodajemo novi auto, pozivamo metodu iz cars servisa, dodajemo na server kola, tako da ne brinemo o id, o tome se brine nesto drugo
        addCar() {
            // console.log(this.newCar)
            cars.add(this.newCar)
                .then(() => {
                    this.$router.push('/cars'); //redirektovanje rute!!!!
                })
                .catch(error => { //catch ne moramo da pisemo uopste
                    console.log(error);
                })
            this.newCar = {}; //vracamo prazan this.newCar da moze da nam vrati prazan
        }
    }
}
</script>



<style>

.container .row .form-group label {
    color: #007bff;
    font-weight: bold;
}

.container .row .form-group .form-check-label .automatic {
    color: #007bff;
    font-weight: bold;
}

#automatic {
    color: #007bff;
    font-weight: bold;
}

.container .row .form-group .form-check-label {
    color: #6c757d;
}

</style>
