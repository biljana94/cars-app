<template>
    <div class="container">
        <div class="row justify-content-md-center">

            
            <!--FORMA ZA UNOS NOVIH KOLA-->
            <form @submit.prevent="onSubmit()">
                <br>
                <div class="form-group row">
                    <label>Brand</label>
                    <input v-model="newCar.brand" class="form-control" type="text" placeholder="Enter brand" minlength="2" required>
                </div>

                <div class="form-group row">
                    <label>Model</label>
                    <input v-model="newCar.model" class="form-control" type="text" placeholder="Enter model" minlength="2" required>
                </div>

                <div class="form-group row">
                    <label>Year</label>
                    <select v-model="newCar.year" class="custom-select">
                        <!--v-for - iteriramo kroz niz years, mora i :value="" jer inace nece prepoznati niz-->
                        <option v-for="(year, index) in years" :value="year" :key="index" required>{{year}}</option>
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
                        <input v-model="newCar.engine" value="Diesel" class="form-check-input" type="radio" required>
                        <label class="form-check-label">Diesel</label>
                    </div>

                    <div class="form-check">
                        <input v-model="newCar.engine" value="Petrol" class="form-check-input" type="radio" required>
                        <label class="form-check-label">Petrol</label>
                    </div>

                    <div class="form-check">
                        <input v-model="newCar.engine" value="Electric" class="form-check-input" type="radio" required>
                        <label class="form-check-label">Electric</label>
                    </div>

                    <div class="form-check">
                        <input v-model="newCar.engine" value="Hybrid" class="form-check-input" type="radio" required>
                        <label class="form-check-label">Hybrid</label>
                    </div>
                </div>

                <div class="form-group row">
                    <label>Number Of Doors</label>
                    <input v-model="newCar.numberOfDoors" class="form-control" type="number" placeholder="Enter number of doors" required>
                </div>

                

                <button type="submit" class="btn btn-primary">Add Car</button>
                <!--button za resetovanje forme; tj vraca praznu formu; @click.stop.prevent="resetForm()" ovo moramo pisati jer smo u formi stavili dugme-->
                <button @click.stop.prevent="resetForm()" type="button" class="btn btn-danger">Reset Form</button>

                <!-- Button trigger modal -->
                <button @click="previewFormInAlert()" type="button" class="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter">Preview</button>




                <!-- Modal -->
                <!-- <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalCenterTitle">Current Car Info</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                {{parseObj.brand}}
                            </div>

                        </div>
                    </div>
                </div> -->

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

            editing: false, //properti koji smo dodali da bi na submit ili promenio postojeca kola ili dodao nova kola
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
                    this.$router.push({path: '/cars'}); //redirektovanje rute!!!!
                    this.newCar = {};
                })
                .catch(error => { //catch ne moramo da pisemo uopste
                    console.log(error);
                })
            
        },

        //resetujemo formu (ako onaj ko pise podatke nije dobro napisao i hoce sve ispocetka da pise moze da resetuje na dugme)
        resetForm() {
            this.newCar = {}; //vracamo prazan this.newCar da moze da nam vrati prazan
        },

        //alert prozor sa trenutno unetim podacima iz forme pre submita
        previewFormInAlert() {
            let stringifyObj = JSON.stringify(this.newCar); //pravimo string od objekta this.newCar(koji se unosi pre submita) pomocu fnc JSON.stringify() ===> {"name":"John","age":30,"}
            let parseObj = JSON.parse(stringifyObj); //parsira objekat koji je string, na kraju cemo dobiti npr ovako: {"name":"John","age":30,"} ===> John, 30

            //parsirani objekat vracamo koji jos nije unet u bazu u alert prozoru
            return alert(`Brand: ${parseObj.brand}\n Model: ${parseObj.model}\n Year: ${parseObj.year}\n Max Speed: ${parseObj.maxSpeed}\n ${parseObj.isAutomatic ? 'Automatic' : 'Manual'}\n Engine: ${parseObj.engine}\n Number Of Doors: ${parseObj.numberOfDoors}\n`
            );

            // return alert(JSON.stringify(this.newCar)); //vraca kao objekat => {"name":"John","age":30,"}
        },

        //menjamo podatke o kolima, pozivamo metodu iz carsService
        editCar() {
            cars.edit(this.$route.params.id, this.newCar)
                .then(() => {
                    this.$router.push({path: '/cars'}); //redirektovanje
                })
                .catch(error => { //ne mora catch
                    console.log(error);
                })
        },

        //na submit ako editujemo kola da promeni posle submita
        //ili da doda nova kola ako dodajemo novi auto
        //u ovoj metodi pozivamo metode iz ove komponente
        onSubmit() {
            if(this.editing) {
                this.editCar(); //pozivamo metodu koja je u istoj komponenti sa 'this'
            } else {
                this.addCar(); //pozivamo metodu koja je u istoj komponenti sa 'this'
            }
        }
    },


    //created hook - kad hocemo da menjamo u formi kola koja smo vec uneli, moramo ovde jer vec uneta kola koja hocu da menjam moram u formu da ih dovucem
    created() {
        //IF STATEMENT - proveraca da li ima id taj, da nam u konzoli ne ispisuje gresku kad idemo na link Add
            //u get() ne mogu da hvatam cist id(id), vec preko rute - hvatam id te rute
        if(this.$route.params.id) {
            cars.get(this.$route.params.id)
            .then(response => {
                this.editing = true;
                this.newCar = response.data;
            })
            .catch(error => { //catch ne moramo da pisemo
                console.log(error);
            });
        }

        
    },
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

.btn {
    margin: 0.25rem;
}

</style>
