<template>

    <vx-card :title="getFormTitle(isEditForm)" noShadow cardBorder>

        <vs-tabs class="px-0">

            <vs-tab :label="getSectionTitle(item.slug)" :key="index" v-for="item, index in formStructure.sections">

                <div class="vx-row mb-6" v-for="field, index in item.fields" :key="index">

                    <div class="vx-col w-full">

                        <!-- Render inputs dynamically based on its types -->

                        <!-- Input type text or number -->
                        <vs-input
                                v-if="field.type === 'text' || field.type === 'number'"
                                :type="field.type"
                                class="w-full"
                                :label="getFieldLabel(item.slug, field.model)"
                                v-model="model[field.model]"
                                :danger="validateField(field.model)"
                                val-icon-danger="close"
                        />

                        <!-- Textarea -->
                        <vs-textarea v-if="field.type === 'textarea'" :label="getFieldLabel(item.slug, field.model)" v-model="model[field.model]" class="mb-0" />

                        <!-- Select -->
                        <vs-select
                                v-if="field.type === 'select'"
                                autocomplete
                                class="w-full"
                                :label="getFieldLabel(item.slug, field.model)"
                                v-model="model[field.model]"
                                :multiple="field.multiple"
                                :is-selected.sync="model[field.model]"
                        >
                            <vs-select-item :key="index" :value="item[field.valueKey]" :text="item[field.labelKey]" v-for="item,index in getOptions(field.options)" />
                        </vs-select>

                        <!-- Validation text -->
                        <span class="text-danger text-xs" v-show="validateField(field.model)">{{ $t('messages.validation.invalidField') }}</span>

                    </div>

                </div>

            </vs-tab>

        </vs-tabs>

        <!-- Actions -->
        <div class="vx-row">
            <div class="vx-col w-full">
                <vs-button color="primary" class="mr-3 mb-2" @click="submitForm()" v-if="!isEditForm">{{ $t('actions.create') }}</vs-button>
                <vs-button color="primary" class="mr-3 mb-2" @click="submitForm()" v-if="isEditForm">{{ $t('actions.update') }}</vs-button>
                <vs-button color="danger" type="border" class="mb-2" :to="{ name: 'filters' }">{{ $t('actions.cancel') }}</vs-button>
            </div>
        </div>

    </vx-card>

</template>
<script>

    //Library for working with requests
    import axios from 'axios';

    //Form helper functions
    import formHelper from "@/mixins/forms/helper";

    //Filter model, validations and types
    import { model, validations, formStructure } from "@/static/filter/filter";

    export default {
        mixins: [ formHelper ],
        props: {
            isEditForm: Boolean,
            formModel: {

                type: String,
                default: 'filter'

            }
        },
        data() {

            return {

                formStructure

            }

        },
        validations: validations,
        methods: {
            createFilter(){

                let requestParams = this.model;

                axios.post(this.API.filter.create, requestParams)
                    .then(
                        response => {

                            if (response.data === 'success') {

                                this.showNotification('success', 'request.createdSuccess', 'success');

                                this.afterCreateCallback();

                            }

                        })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            updateFilter(){

                let requestParams = this.model;

                let filter_id = this.$route.params.filterId;

                axios.put(this.API.filter.update + '/' + filter_id, requestParams)
                    .then(
                        response => {

                            if (response.data === 'success') {

                                this.showNotification('success', 'request.updatedSuccess', 'success');

                            }

                        })
                    .catch(
                        error => {

                            this.showNotification('error', 'request.error', 'danger');

                        }
                    );

            },
            afterCreateCallback(){

                const component = this;

                setTimeout(function () {
                    component.redirectToIndex('filters');
                    component.setModel();
                }, 500);

            },
            setModel(){

                this.model = Object.assign({}, model);

            },
            getSingleFilter(){

                let filter_id = this.$route.params.filterId;

                let requestParams = {

                    params: {

                        filter_id: filter_id

                    }

                };

                axios.get(this.API.filter.single, requestParams).then(response => {
                    this.model = response.data;
                    this.model.attributes = this.normalizeData(response.data.attributes);
                });

            },
            loadData(){

                //Get attributes list
                this.getAttributes();

                //Get the data for editing
                if(this.isEditForm){

                    this.getSingleFilter();

                }

            },
            submitForm() {

                if(!this.$v.$invalid){

                    if(this.isEditForm){

                        this.updateFilter();

                    }
                    else{

                        this.createFilter();

                    }

                }
                else{

                    this.showNotification('error', 'validation.invalidForm', 'danger');

                }

            }
        },
        mounted() {

            //Set the model
            this.setModel();

            //Load the necessary data
            this.loadData();

        },
        created: function () {

            //Set an instance for the form rendering
            this.setInstance(this.formModel);

        }

    }

</script>