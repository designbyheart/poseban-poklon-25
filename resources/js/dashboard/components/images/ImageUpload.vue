<template>


    <div>

        <div class="vx-row mb-3" v-if="!isQuillEditor">

            <div class="vx-col w-full">
                <div class="abr-form-images flex flex-wrap content-start w-full">

                    <div class="abr-form-image" :style="{width: previewWidth}" :key="image.id" v-for="image in selectedImages" :image-id="image.id">
                        <img :src="image.url" width="100%" class="object-cover rounded" />
                        <div class="abr-image-btn bg-danger rounded shadow" @click="removeImage(image)">
                            <i class="material-icons">
                                close
                            </i>
                        </div>
                    </div>

                </div>
            </div>
            <div class="vx-col w-full">
                <vs-button color="primary" type="filled" @click="showImagesModal()">{{ getActionName('choose', true, multiple) }}</vs-button>
            </div>

        </div>

        <vs-popup fullscreen :title="getPropertyTitle('uploaderTitle')" :active.sync="popupActive">

            <div class="vx-row abr-images-container mb-0">
                <div id="abr-images" class="vx-col w-3/4 h-full abr-images flex flex-wrap content-start mb-0 pr-0 vs-con-loading__container">

                    <div class="abr-images-item rounded" v-bind:class="{'border-primary': isSelected(image.id)}" :key="image.id" v-for="image, index in images" :image-id="image.id">
                        <img :src="image.url" width="100%" class="object-cover" v-on:click="selectImage(image)" @load="hideLoad(index)" />
                        <div class="abr-image-btn bg-danger rounded shadow" v-if="isSelected(image.id)" @click="removeImage(image)">
                            <i class="material-icons">
                                close
                            </i>
                        </div>
                    </div>

                </div>
                <div class="vx-col w-1/4 pl-0">
                    <div class="vx-row">
                        <div class="vx-col w-full abr-selected-image" v-if="!isEmpty(currentImage)">
                            <h3 class="mb-6">{{ getPropertyTitle('imageParameters') }}</h3>
                            <div class="vx-row abr-image-preview mb-6">
                                <div class="vx-col w-full">
                                    <img :src="currentImage.url" class="mb-3" />
                                    <p>{{ currentImage.title }}</p>
                                </div>
                            </div>
                            <div class="vx-row abr-image-form">
                                <div class="vx-col w-full mb-6">
                                    <vs-input :label-placeholder="getPropertyTitle('title')" class="w-full" v-model="currentImage.title" @change="updateImage(currentImage)" />
                                </div>
                                <div class="vx-col w-full mb-6">
                                    <vs-input :label-placeholder="getPropertyTitle('description')" class="w-full" v-model="currentImage.description" @change="updateImage(currentImage)" />
                                </div>
                                <div class="vx-col w-full mb-6">
                                    <vs-input :label-placeholder="getPropertyTitle('alt')" class="w-full" v-model="currentImage.alt" @change="updateImage(currentImage)" />
                                </div>
                                <div class="vx-col w-full mb-6">
                                    <vs-button color="danger" class="w-1/2" type="filled" @click="deleteImage(currentImage)">{{ getActionName('delete', true) }}</vs-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="vx-row abr-images-pagination mb-0">
                <div class="vx-col flex justify-center items-center w-3/4">
                    <vs-pagination :total="pagination.totalPages" v-model="pagination.currentPage"></vs-pagination>
                </div>
                <div class="vx-col flex justify-center items-center w-1/4 pl-0">
                    <vs-button color="primary" type="filled" class="mr-3" @click="closeImagesModal()">{{ getActionName('choose', true, multiple) }}</vs-button>
                    <vs-button type="border" @click="uploadPopupActive = true">{{ getActionName('upload') }}</vs-button>
                </div>
            </div>

            <vs-popup :title="getActionName('upload', true, multiple)" :active.sync="uploadPopupActive">
                <div class="vx-row m-0">
                    <div class="vx-col w-full p-0">
                        <file-pond
                                name="file[]"
                                :label-idle="uploadLabel"
                                allow-multiple="true"
                                :accepted-file-types="allowedFileTypes"
                                :server="uploadUrl"
                                v-bind:files="files"
                                v-on:processfiles="imageUploaded()"
                                :max-file-size="maxFileSize"
                        />
                    </div>
                    <div class="vx-col w-full p-0">
                        <vs-button class="float-right" @click="uploadPopupActive = false">{{ getActionName('close') }}</vs-button>
                    </div>
                </div>
            </vs-popup>

        </vs-popup>

    </div>


</template>

<script>

    import axios from 'axios';

    //Application routes
    import { API } from '../../mixins/api/api.js';

    // Import Vue FilePond
    import vueFilePond from 'vue-filepond';

    // Import FilePond styles
    import 'filepond/dist/filepond.min.css';

    //FilePond plugins
    import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
    import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

    // Create component
    const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

    //Events bus
    import { EventBus } from '../../EventBus';

    export default {
        name: "ImageUpload",
        components: { FilePond },
        props: {
            per_page: {
                type: Number,
                default: 20
            },
            multiple: {
                type: Boolean,
                default: false
            },
            isQuillEditor: {
                type: Boolean,
                default: false
            },
            previewWidth: {
                type: String,
                default: '24%'
            },
            maxFileSize: {
                type: String,
                default: '1MB'
            },
            allowedFileTypes: {
                type: String,
                default: 'image/jpeg, image/png, image/svg+xml'
            }
        },
        data() {
            return {
                popupActive: false,
                uploadPopupActive: false,
                uploadLabel: 'Drag & Drop your image or <span class="filepond--label-action"> Browse </span>',
                uploadUrl: '',
                files: [],
                images: [],
                currentImage: {},
                selectedImages: [],
                requestParams: {
                    per_page: this.per_page,
                    sort_key: 'created_at',
                    sort_order: 'desc'
                },
                pagination: {
                    currentPage: 1,
                    nextPageUrl: '',
                    totalPages: 1
                },
                loadedImages: [],
                API
            }
        },
        watch: {

            'pagination.currentPage': function(value, oldValue) {

                this.getImages();

            },
            '$attrs.value': function (value, oldValue) {

                this.setData();

            }

        },
        methods: {
            hideLoad(index){

                this.loadedImages.push(index);

                if(this.loadedImages.length === this.images.length){

                    this.$vs.loading.close('#abr-images > .con-vs-loading')

                }

            },
            getImages() {

                this.showLoading();

                let request_url = this.API.image.list;

                let page = this.pagination.currentPage;

                if (this.pagination.nextPageUrl != '') {

                    request_url = request_url + '?page=' + page

                }

                //Clear the loaded images list
                this.images = [];
                this.loadedImages = [];

                axios.get(request_url, {params: this.requestParams}).then(response => {

                    this.images = response.data.data;

                    this.pagination.nextPageUrl = response.data.next_page_url;

                    this.pagination.totalPages = response.data.last_page;

                });

            },
            imageUploaded(){

                this.getImages();

            },
            selectImage(image){

                //Set current image for the image form
                this.setCurrentImage(image);

                let selectedImages = this.selectedImages;

                let imagesCount = selectedImages.length;

                let multipleUpload = this.multiple;

                let existingImage = selectedImages.find(function (item) {

                    return item.id === image.id;

                });

                if(this.isEmpty(existingImage)){

                    if(multipleUpload){

                        this.selectedImages.push(image);

                    }
                    else{

                        this.selectedImages.splice(0, 1);

                        this.selectedImages.push(image);

                    }

                }

                if(imagesCount < 1 || multipleUpload) {

                    let existingImage = selectedImages.find(function (item) {

                        return item.id === image.id;

                    });

                    if(this.isEmpty(existingImage)){

                        this.selectedImages.push(image);

                    }

                }

                //Send the selected image
                this.handleSelect();

            },
            isSelected(image){

                let selectedImage = this.selectedImages.find(function(item){

                    return item.id === image;

                });

                if(selectedImage){

                    return true;

                }

            },
            updateImage(image){

                axios.put(this.API.image.update + '/' + image.id, image).then(response => {

                    if(response.data === 'success'){

                        this.showNotification('success', 'request.updatedSuccess', 'success');

                    }
                    else{

                        this.showNotification('error', 'request.error', 'danger');

                    }

                });

            },
            removeImage(image){

                let selectedImages = this.selectedImages;

                let existingImage = selectedImages.find(function(item){

                    return item.id === image.id;

                });

                if(existingImage !== undefined){

                    let selectedPosition = selectedImages.indexOf(existingImage);

                    selectedImages.splice(selectedPosition, 1);

                }

                if(this.currentImage.id === image.id){

                    this.currentImage = {};

                }

            },
            deleteImage(image){

                this.removeImage(image);

                let images = this.images;

                let existingImage = images.find(function(item){

                    return item.id === image.id;

                });

                axios.delete(this.API.image.delete + '/' + image.id).then(response => {

                    if(response.data === 'success'){

                        this.showNotification('success', 'request.deletedSuccess', 'success');

                        if(existingImage !== undefined){

                            let position = images.indexOf(image);

                            images.splice(position, 1);

                        }

                    }
                    else{

                        this.showNotification('error', 'request.error', 'danger');

                    }

                });

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

                    instance = this.$tc('models.image.title', count);

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
            showLoading(){

                this.$vs.loading({
                    container: '#abr-images',
                    scale: 1,
                    background: '#fff',
                    color: 'primary'
                });

            },
            setImages(images){

                this.selectedImages = images;

                if(this.currentImage === {}){

                    this.setCurrentImage();

                }

            },
            setCurrentImage(image){

                if(image === undefined){

                    if (this.selectedImages.length > 0) {

                        this.currentImage = Object.assign({}, this.selectedImages[0]);

                    }
                    else {

                        this.currentImage = {};

                    }

                }
                else {

                    this.currentImage = Object.assign(image);

                }

            },
            isEmpty(obj) {
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) return false;
                }
                return true;
            },
            showImagesModal(){
                this.popupActive = true;
                if(this.selectedImages.length === 0 && this.pagination.currentPage === 1) {

                    //Show loading animation
                    this.showLoading();

                }
                this.getImages();
                this.setCurrentImage();
            },
            closeImagesModal(){
                this.popupActive = false;
            },
            handleSelect (e) {

                this.$emit('input', this.selectedImages);

            },
            setData(){

                let images = this.$attrs.value;

                if(images !== "" && images !== undefined){

                    if(!Array.isArray(images)){

                        images = JSON.parse(images);

                    }

                    this.setImages(images);

                }

                this.setUploadUrl();

            },
            getActionName(action, useModel, isPlural){

                let count = 1;

                if(isPlural){

                    count = 2;

                }

                let actionText = this.$t('actions.' + action);

                if(useModel){

                    let instanceTitle = this.$tc('models.image.title', count);

                    return actionText + ' ' + instanceTitle;

                }
                else{

                    return actionText;

                }

            },
            //Newer and more advanced method for retrieving a model property name
            getPropertyTitle(property){

                return this.$t('models.image.properties.' + property);

            },
            setUploadUrl(){

                this.uploadUrl = this.API.image.create;

            },
            listenEvents(){

                //Open images manager from quill editor
                EventBus.$on('open-image-uploader', action => {

                    this.showImagesModal();

                });

            }
        },
        created() {

            //Set data for the images manager
            this.setData();

            //Listen to events
            this.listenEvents();

        }
    }
</script>