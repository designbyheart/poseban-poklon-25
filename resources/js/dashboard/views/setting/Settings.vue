<template>

    <div>

        <vx-card :title="$t('settings.pageTitle')">
            <div class="vx-row">
                <div class="vx-col w-full">

                    <div class="vx-row mb-3" :key="index" v-for="setting, index in settingsList">

                        <div class="vx-col w-full">
                            <p class="font-bold mb-2">{{ getSettingName(setting.slug) }}</p>
                        </div>
                        <div class="vx-col w-full">

                            <!--Select-->
                            <vs-select
                                autocomplete
                                v-model="setting.value"
                                :is-selected.sync="setting.value"
                                class="w-full"
                                v-if="setting.type === 'select'"
                            >
                                <vs-select-item :key="index" :value="item[setting.valueKey]" :text="item[setting.labelKey]" v-for="item,index in getOptions(setting.options)" />
                            </vs-select>

                            <!--Textarea-->
                            <vs-textarea
                                v-model="setting.value"
                                class="mb-0"
                                v-if="setting.type === 'textarea'"
                            >
                            </vs-textarea>

                            <!--Text input-->
                            <vs-input
                                v-model="setting.value"
                                class="w-full mb-0"
                                v-if="setting.type === 'textInput'"
                            >
                            </vs-input>

                            <!-- Image upload component -->
                            <image-upload v-if="setting.type === 'image'" v-model="setting.value"></image-upload>

                        </div>

                    </div>

                </div>
            </div>
            <div class="vx-row">
                <div class="vx-col w-full">
                    <vs-button @click="updateSettings()">{{ $t('actions.update') }}</vs-button>
                </div>
            </div>
        </vx-card>

    </div>

</template>
<script>

    //Library for working with requests
    import axios from 'axios';

    //Vue select
    import vSelect from 'vue-select'

    //Image uploader
    import ImageUpload from '../../components/images/ImageUpload';

    //Settings list
    import { settingsList, options } from "../../static/setting/setting";

    //Applications routes
    import { API } from '@/mixins/api/api';

    export default {
        components: {vSelect, ImageUpload},
        data() {

            return {

                instance: 'setting',
                instanceSlug: 'settings',
                settingsList,
                options,
                settings: [],
                API
            }

        },
        methods: {

            getOptionsData(){

                let component = this;

                this.options.forEach(function(item){

                    component.getData(item.instance);

                });

            },
            getOptions(name){

                let container = this.options.find(function(item){

                    return item.name === name;

                });

                return container.data;

            },
            getData(instance, params){

                let items = [];

                axios.get(this.API[instance].list, params).then(response => {

                    items = response.data.data;

                    let container = this.options.find(function(item){

                        return item.instance === instance;

                    });

                    if(container !== undefined){

                        container.data = items;

                    }

                });


            },
            getSettings(params){

                axios.get(this.API[this.instance].list, params).then(response => {

                    this.settings = response.data.data;

                    //Set values for settings
                    this.setValues();

                });

            },
            setValues(){

                let settings = this.settings;

                this.settingsList.forEach(function(setting){

                    let settingItem = settings.find(function(item){

                        return item.slug === setting.slug;

                    });

                    if(settingItem !== undefined){

                        setting.value = settingItem.content;

                    }

                });

            },
            updateSettings(){

                let component = this;

                let settings = this.settings;

                let requestUrl = this.API[this.instance].update;

                let requestParams = {
                    settings: []
                };

                this.settingsList.forEach(function(setting){


                    let settingItem = settings.find(function(item){

                        return item.slug === setting.slug;

                    });

                    if(settingItem !== undefined && setting.value !== settingItem.content){

                        let settingObject = {
                            id: settingItem.id,
                            content: setting.value
                        };

                        requestParams.settings.push(settingObject);

                    }


                });


                axios.put(requestUrl, requestParams).then(
                    response => {

                        if (response.data === 'success') {

                            this.showNotification('success', 'request.updatedSuccess', 'success', undefined, true);

                        }

                    })
                    .catch(
                        error => {

                            this.showNotification('success', 'request.error', 'danger');

                        }
                    );

            },
            getSettingName(slug){

                return this.$t('settings.' + slug + '.title');

            },
            showNotification(type, message, color, customInstance, isPlural){

                let instance = '';

                let count = 1;

                if(isPlural){

                    count = 2;

                }

                if(customInstance){

                    instance = this.$tc('models.' + customInstance + '.title', count);

                }
                else{

                    instance = this.$tc('models.' + this.instance + '.title', count);

                }

                let title = this.$t('messages.' + type);

                let text = this.$tc('messages.' + message, count, { instance: instance });

                this.$vs.notify(
                    {
                        title: title,
                        text:  text,
                        color: color
                    }
                );

            },

        },
        created(){

        },
        mounted() {

            //Get the data for selects
            this.getOptionsData();

            //Get settings values
            this.getSettings();

        }
    }
</script>