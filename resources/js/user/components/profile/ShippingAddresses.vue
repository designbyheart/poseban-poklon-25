<template>

    <div class="col-lg-9 col-md-9 profile-content-shipping">
        <div class="profile-information-form">
            <h4 class="information-form-title">
                Adrese
            </h4>
            <div class="shipping-edit-container">
                <div class="shipping-address" :key="index" v-for="address,index in addresses" style="margin-bottom: 20px;">
                    <div class="shipping-edit-row">
                        <div class="shipping-edit-title">Ime</div>
                        <input type="text" v-model="address.first_name" class="shipping-edit-input" placeholder="Ime" required>
                    </div>
                    <div class="shipping-edit-row">
                        <div class="shipping-edit-title">Prezime</div>
                        <input type="text" v-model="address.last_name" class="shipping-edit-input" placeholder="Prezime" required>
                    </div>
                    <div class="shipping-edit-row">
                        <div class="shipping-edit-title">Kompanija</div>
                        <input type="text" v-model="address.company" class="shipping-edit-input" placeholder="Kompanija">
                    </div>
                    <div class="shipping-edit-row">
                        <div class="shipping-edit-title">Ulica</div>
                        <input type="text" v-model="address.address_one" class="shipping-edit-input" placeholder="Ulica" required>
                    </div>
                    <div class="shipping-edit-row">
                        <div class="shipping-edit-title">Broj kuće/zgrade, broj stana, ili kancelarije</div>
                        <input type="text" v-model="address.address_two" class="shipping-edit-input" placeholder="Broj kuće/zgrade, broj stana">
                    </div>
                    <div class="shipping-edit-row">
                        <div class="shipping-edit-title">Grad</div>
                        <input type="text" v-model="address.city" class="shipping-edit-input" placeholder="Grad" required>
                    </div>
                    <div class="shipping-edit-row">
                        <div class="shipping-edit-title">Država</div>
                        <select type="text" v-model="address.country" class="shipping-edit-input shipping-edit-select" required>
                            <option :value="country" class="shipping-edit-option" :key="index" v-for="country,index in countries">{{ country }}</option>
                        </select>
                    </div>
                    <div class="shipping-edit-row">
                        <div class="shipping-edit-title">Poštanski broj</div>
                        <input type="text" v-model="address.post_code" class="shipping-edit-input" placeholder="Poštanski broj" required>
                    </div>
                    <div class="shipping-edit-row-btn">
                        <button class="information-form-btn" @click="removeAddress(index)">Ukloni adresu</button>
                    </div>
                </div>
            </div>
            <div class="shipping-edit-row-btn">
                <button class="information-form-btn" @click="submitForm">Sačuvaj</button>
                <button class="information-form-btn-add" @click="addAddress">+ Dodaj novu adresu</button>
            </div>
        </div>
    </div>

</template>

<script>

    import axios from 'axios';

    //Necessary data for the form
    import { addressModel, countries } from '../../static/address/structures';

    export default {

        name: 'ShippingAddresses',
        props: {

            currentUser: {
                type: Object
            },
            userAddresses: {
                type: Array
            }

        },
        data(){
            return {
                user: {},
                addresses: [],
                addressModel,
                countries
            }
        },
        methods: {

            updateAddresses(){

                let component = this;

                let requestUrlBase = this.API.address.update;

                this.addresses.forEach(function(address){

                    if(address.id !== undefined){

                        let requestUrl = requestUrlBase + address.id;

                        let requestParams = address;

                        axios.put(requestUrl, requestParams).then(response => {

                            if(response.data === 'success'){

                                component.showNotification('success', 'Adresa je uspešno ažurirana.');

                            }

                        }).catch(error => {

                            component.showNotification('error', 'Desila se greška. Pokušaj ponovo.');

                        });

                    }
                    else{

                        component.createAddress(address);

                    }

                });

            },
            createAddress(address){


                let requestUrl = this.API.address.create;

                let requestParams = address;

                axios.post(requestUrl, requestParams).then(response => {

                    if(response.data === 'success'){

                        this.showNotification('success', 'Adresa je uspešno kreirana.');

                    }

                }).catch(error => {

                    this.showNotification('error', 'Desila se greška. Pokušaj ponovo.');

                });

            },
            removeAddress(index){

                let address = this.addresses[index];

                if(address.id !== undefined){

                    let requestUrl = this.API.address.delete + address.id

                    axios.delete(requestUrl).then(response => {

                        if(response.data === 'success'){

                            this.showNotification('success', 'Adresa je uspešno uklonjena.');

                        }

                    }).catch(error => {

                        this.showNotification('error', 'Desila se greška. Pokušaj ponovo.');

                    });

                }

                this.addresses.splice(index, 1);

            },
            setFormData(){

                this.user = this.currentUser;
                this.addresses = this.userAddresses;

            },
            addAddress(){

                this.addresses.push(addressModel);

            },
            submitForm() {

                this.updateAddresses();

            }

        },
        mounted() {

            //Set form data
            this.setFormData();

        }

    }

</script>