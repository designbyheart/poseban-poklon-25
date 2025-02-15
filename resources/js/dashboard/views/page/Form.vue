<template>

    <vx-card :title="getFormTitle(isEditForm)" noShadow cardBorder>

        <vs-tabs class="px-0">

            <vs-tab :label="getSectionTitle('general')">

                <div class="con-tab pt-3">

                    <div class="vx-row mb-6">

                        <div class="vx-col w-full">

                            <p class="font-bold text-sm mb-2">{{ getPropertyTitle('title') }}</p>
                            <vs-input
                                    type="text"
                                    class="w-full"
                                    v-model="model.title"
                                    :danger="validateField('title')"
                                    val-icon-danger="close"
                            />

                            <!-- Validation text -->
                            <span class="text-danger text-xs" v-show="validateField('title')">{{ $t('messages.validation.invalidField') }}</span>

                        </div>

                    </div>

                    <div class="vx-row mb-6">

                        <div class="vx-col w-full">
                            <p class="font-bold text-sm mb-2">{{ getPropertyTitle('content') }}</p>
                            <quill-editor
                                v-model="model.content"
                                :options="editorOption"
                                ref="pageQuillEditor"
                            ></quill-editor>
                            <image-upload v-model="uploadedImage" :multiple="false" :is-quill-editor="true"></image-upload>
                        </div>

                    </div>

                    <div class="vx-row mb-6">

                        <div class="vx-col w-full">

                            <p class="font-bold text-sm mb-2">{{ getPropertyTitle('slug') }}</p>
                            <vs-input
                                    type="text"
                                    class="w-full"
                                    v-model="model.slug"
                                    :danger="validateField('slug')"
                                    val-icon-danger="close"
                            />

                            <!-- Validation text -->
                            <span class="text-danger text-xs" v-show="validateField('slug')">{{ $t('messages.validation.invalidField') }}</span>

                        </div>

                    </div>

                    <div class="vx-row mb-6">

                        <div class="vx-col w-full">
                            <p class="font-bold text-sm mb-2">{{ getPropertyTitle('status') }}</p>
                            <vs-select
                                    class="w-full"
                                    v-model="model.status"
                            >
                                <vs-select-item :key="index" :value="item.value" :text="item.title" v-for="item,index in statuses" />
                            </vs-select>
                        </div>

                    </div>

                    <div class="vx-row mb-6">

                        <div class="vx-col w-full">

                            <vs-checkbox v-model="model.show_in_menu">
                                <p class="font-bold text-sm">{{ getPropertyTitle('showInMenu') }}</p>
                            </vs-checkbox>

                        </div>

                    </div>

                </div>

            </vs-tab>

            <vs-tab :label="getSectionTitle('seo')" class="overflow-visible">

                <div class="con-tab pt-3">

                    <div class="vx-row mb-3">

                        <div class="vx-col w-full">

                            <p class="font-bold text-sm mb-2">{{ getPropertyTitle('seoTitle') }}</p>
                            <vs-input
                                    type="text"
                                    class="w-full"
                                    v-model="model.seo_title"
                                    :danger="validateField('seo_title')"
                                    val-icon-danger="close"
                            />

                            <!-- Validation text -->
                            <span class="text-danger text-xs" v-show="validateField('seo_title')">{{ $t('messages.validation.invalidField') }}</span>

                        </div>

                    </div>

                    <div class="vx-row mb-3">

                        <div class="vx-col w-full">

                            <p class="font-bold text-sm mb-2">{{ getPropertyTitle('seoDescription') }}</p>
                            <vs-textarea v-model="model.seo_description"></vs-textarea>

                        </div>

                    </div>

                    <div class="vx-row mb-3">

                        <div class="vx-col w-full">

                            <p class="font-bold text-sm mb-2">{{ getPropertyTitle('seoKeywords') }}</p>
                            <vs-input
                                    type="text"
                                    class="w-full"
                                    v-model="model.seo_keywords"
                                    :danger="validateField('seo_keywords')"
                                    val-icon-danger="close"
                            />

                            <!-- Validation text -->
                            <span class="text-danger text-xs" v-show="validateField('seo_keywords')">{{ $t('messages.validation.invalidField') }}</span>

                        </div>

                    </div>

                </div>

            </vs-tab>


        </vs-tabs>

        <!-- Actions -->
        <div class="vx-row">
            <div class="vx-col w-full">
                <vs-button color="primary" class="mr-3 mb-2" @click="submitForm()" v-if="!isEditForm">{{ $t('actions.create') }}</vs-button>
                <vs-button color="primary" class="mr-3 mb-2" @click="submitForm()" v-if="isEditForm">{{ $t('actions.update') }}</vs-button>
                <vs-button color="danger" type="border" class="mb-2" :to="{ name: indexRoute }">{{ $t('actions.cancel') }}</vs-button>
            </div>
        </div>

    </vx-card>

</template>
<script>

    //Library for working with requests
    import axios from 'axios';

    //Form helper functions
    import formHelper from "@/mixins/forms/helper";

    //Model, validations and types
    import { model, validations } from "@/static/page/page";

    //Quill editor
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import { quillEditor } from 'vue-quill-editor'

    //Fonts list
    const fontsList = ['Rubik-light', 'Rubik-regular', 'Rubik-medium', 'Rubik-bold'];

    // Set toolbar options
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}],

        [{'size': ['small', false, 'large', 'huge']}],
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],
        [{'align': []}],
        ['link', 'image']
    ];

    //Image manager
    import ImageUpload from '../../components/images/ImageUpload';

    //Events bus
    import EventBus from '../../EventBus';

    //Open image uploader
    function openImageUploader(){

        EventBus.$emit('open-image-uploader', true);

    }

    export default {
        mixins: [ formHelper ],
        components: { quillEditor, ImageUpload },
        props: {
            isEditForm: Boolean,
            formModel: {

                type: String,
                default: 'page'

            },
            indexRoute: {

                type: String,
                default: 'pages'

            }
        },
        data() {

            return {
                editorOption: {
                    modules: {
                        toolbar: {
                            container: toolbarOptions,
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        openImageUploader();
                                    } else {
                                        this.quill.format('image', false);
                                    }
                                }
                            }
                        }
                    },
                    theme: 'snow'
                },
                uploadedImage: ''
            }

        },
        computed: {
            editor(){
                return this.$refs.pageQuillEditor.quill
            }
        },
        watch: {
          'uploadedImage': function (images) {

              let quill = this.editor;

              // Get cursor location
              let length = quill.getSelection().index;

              // Insert image at cursor location
              quill.insertEmbed(length, 'image', images[0].url);

              // Set cursor to the end
              quill.setSelection(length + 1);

          }
        },
        validations: validations,
        methods: {
            create(){

                let requestParams = this.model;

                let requestUrl = this.API[this.instance].create;

                axios.post(requestUrl, requestParams)
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
            update(){

                let requestParams = this.model;

                let id = this.$route.params.id;

                let requestUrl = this.API[this.instance].update + '/' + id;

                axios.put(requestUrl, requestParams)
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
                    component.redirectToIndex(component.indexRoute);
                    component.setModel();
                }, 500);

            },
            setModel(){

                this.model = Object.assign({}, model);

            },
            getSingleItem(){

                let id = this.$route.params.id;

                let requestParams = {

                    params: {

                        id: id

                    }

                };

                let requestUrl = this.API[this.instance].single;

                axios.get(requestUrl, requestParams).then(response => {

                    this.model = response.data;

                });

            },
            loadData(){

                //Get the data for editing
                if(this.isEditForm){

                    this.getSingleItem();

                }

            },
            submitForm() {

                if(!this.$v.$invalid){

                    if(this.isEditForm){

                        this.update();

                    }
                    else{

                        this.create();

                    }

                }
                else{

                    this.showNotification('error', 'validation.invalidForm', 'danger');

                }

            },
            openImageUploader(){

                EventBus.$emit('open-image-uploader');

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

<style>

    body .ql-container{
        min-height: 450px;
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Rubik-light']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='Rubik-light']::before
    {
        content: 'Rubik Light';
        font-family: 'Rubik-light';
    }

    .ql-font-Rubik-light {
        font-family: 'Rubik-light';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Rubik-regular']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='Rubik-regular']::before
    {
        content: 'Rubik regular';
        font-family: 'Rubik-regular';
    }

    .ql-font-Rubik-regular {
        font-family: 'Rubik-regular';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Rubik-medium']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='Rubik-medium']::before
    {
        content: 'Rubik Medium';
        font-family: 'Rubik-medium';
    }

    .ql-font-Rubik-medium {
        font-family: 'Rubik-medium';
    }

    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='Rubik-bold']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='Rubik-bold']::before
    {
        content: 'Rubik Bold';
        font-family: 'Rubik-bold';
    }

    .ql-font-Rubik-bold {
        font-family: 'Rubik-bold';
    }

</style>