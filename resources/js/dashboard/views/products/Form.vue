<template>

    <vx-card :title="getFormTitle(isEditForm)" noShadow cardBorder>

        <vs-tabs class="px-0">

            <!-- General -->
            <vs-tab :label="getFormSectionTitle('general')">
                <div class="con-tab pt-3">
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <p class="font-bold text-sm mb-2">
                                {{ getPropertyTitle('title') }}
                            </p>
                            <vs-input type="text" class="w-full" v-model="product.title" />
                            <span class="text-danger text-xs" v-show="$v.product.description.$invalid">{{ $t('messages.validation.invalidField') }}</span>
                        </div>
                    </div>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <p class="font-bold text-sm mb-2">
                                {{ getPropertyTitle('description') }}
                            </p>
                            <!-- <vs-textarea v-model="product.description" class="mb-0" /> -->
                            <quill-editor
                                v-model="product.description"
                                :options="editorOption"
                                ref="pageQuillEditor"
                            ></quill-editor>
                            <span class="text-danger text-xs" v-show="$v.product.description.$invalid">{{ $t('messages.validation.invalidField') }}</span>
                        </div>
                    </div>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <p class="font-bold text-sm mb-2">
                                {{ getPropertyTitle('short_description') }}
                            </p>
                            <!-- <vs-textarea v-model="product.short_description" class="mb-0" /> -->
                            <quill-editor
                                v-model="product.short_description"
                                :options="editorOption"
                                ref="pageQuillEditor"
                            ></quill-editor>
                            <span class="text-danger text-xs" v-show="$v.product.short_description.$invalid">{{ $t('messages.validation.invalidField') }}</span>
                        </div>
                    </div>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <p class="font-bold text-sm mb-2">
                                {{ getPropertyTitle('voucher_description') }}
                            </p>
                            <vs-textarea v-model="product.voucher_description" class="mb-0" />
                            <span class="text-danger text-xs" v-show="$v.product.voucher_description.$invalid">{{ $t('messages.validation.invalidField') }}</span>
                        </div>
                    </div>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <p class="font-bold text-sm mb-2">
                                {{ getPropertyTitle('za_koga') }}
                            </p>
                            <vs-input type="text" class="w-full" v-model="product.za_koga" />
                        </div>
                    </div>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <p class="font-bold text-sm mb-2">
                                {{ getPropertyTitle('slug') }}
                            </p>
                            <vs-input type="text" class="w-full" v-model="product.slug" />
                            <span class="text-danger text-xs" v-show="$v.product.slug.$invalid">{{ $t('messages.validation.invalidField') }}</span>
                        </div>
                    </div>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <p class="font-bold text-sm mb-2">
                                {{ getPropertyTitle('status') }}
                            </p>
                            <vs-select
                                    class="w-full"
                                    v-model="product.status"
                            >
                                <vs-select-item :key="index" :value="item.value" :text="item.title" v-for="item,index in statuses" />
                            </vs-select>
                        </div>
                    </div>
                </div>
            </vs-tab>



            <!-- Price -->
            <vs-tab :label="getFormSectionTitle('price')">
                <div class="con-tab pt-3">
                    <div class="vx-row mb-6">
                        <div class="vx-col">
                            <p class="font-bold text-sm mb-2">
                                {{ getPropertyTitle('price') }}
                            </p>
                            <vs-input
                                    type="number"
                                    class="w-full"
                                    v-model="product.price"
                                    :danger="$v.product.price.$invalid"
                                    val-icon-danger="close"
                            />
                            <span class="text-danger text-xs" v-show="$v.product.price.$invalid">{{ $t('messages.validation.invalidField') }}</span>
                        </div>
                        <div class="vx-col">
                            <p class="font-bold text-sm mb-2">
                                {{ getPropertyTitle('company_price') }}
                            </p>
                            <vs-input
                                    type="number"
                                    class="w-full"
                                    v-model="product.company_price"
                                    :danger="$v.product.company_price.$invalid"
                                    val-icon-danger="close"
                            />
                            <span class="text-danger text-xs" v-show="$v.product.company_price.$invalid">{{ $t('messages.validation.invalidField') }}</span>
                        </div>
                    </div>
                </div>
            </vs-tab>



            <!-- Connections -->
            <vs-tab :label="getFormSectionTitle('connections')">
                <div class="con-tab pt-3">
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <p class="font-bold text-sm mb-2">
                                {{ getPropertyTitle('producentId') }}
                            </p>
                            <vs-select
                                    class="w-full"
                                    v-model="product.producent_id"
                            >
                                <vs-select-item :key="index" :value="item.id" :text="item.title" v-for="item,index in producents" />
                            </vs-select>
                            <span class="text-danger text-xs" v-show="$v.product.producent_id.$invalid">{{ $t('messages.validation.invalidField') }}</span>
                        </div>
                    </div>
                    <div class="vx-row mb-6">
                        <div class="vx-col w-full">
                            <p class="font-bold text-sm mb-2">
                                {{ getPropertyTitle('categories') }}
                            </p>
                            <v-select v-model="selectedCategories" label="title" multiple :options="categories" :reduce="category => category.id" @search="searchCategories"></v-select>
                            <span class="text-danger text-xs" v-show="$v.selectedCategories.$invalid">{{ $t('messages.validation.invalidField') }}</span>
                        </div>
                    </div>
                </div>


            </vs-tab>



            <!-- Attributes -->
            <vs-tab :label="getFormSectionTitle('attributes')">
                <div class="con-tab pt-3">
                    <div class="vx-row mb-6">

                        <div class="vx-col w-full" v-show="productFilters.length > 0">
                            <div class="vx-row mb-3">
                                <div class="vx-col w-1/6">
                                    <p class="font-bold text-sm">{{ getPropertyTitle('filter.title') }}</p>
                                </div>
                                <div class="vx-col w-2/3">
                                    <p class="font-bold text-sm">{{ getPropertyTitle('filter.attributes') }}</p>
                                </div>
                            </div>
                            <div class="vx-row mb-3" :key="index" v-for="filter,index in productFilters">
                                <div class="vx-col w-1/6">
                                    <p class="font-bold text-sm">{{ filter.name }}</p>
                                </div>
                                <div class="vx-col w-2/3">

                                    <v-select v-model="filter.selected"
                                              label="name"
                                              multiple
                                              :key="filter.name"
                                              :options="filter.attributes"
                                              :reduce="attribute => ({id: attribute.id, name: attribute.name})"
                                    ></v-select>

                                </div>
                                <div class="vx-col w-1/6">
                                    <vs-button color="danger" icon="delete" @click="removeFilter(index)"></vs-button>
                                </div>
                            </div>
                        </div>

                        <div class="vx-col w-full">
                            <div class="vx-row">
                                <div class="vx-col w-2/3 mb-3">
                                    <p class="font-bold text-sm mb-3">{{ getPropertyTitle('filter.search') }}</p>
                                    <v-select v-model="selectedFilter" label="name" :options="filters" :reduce="filter => ({id: filter.id, name: filter.name, attributes: filter.attributes})" @search="searchFilters"></v-select>
                                </div>
                                <div class="vx-col w-1/3 mb-3 flex items-end">
                                    <vs-button @click="addFilter()">{{ $t('actions.addNew') }}</vs-button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </vs-tab>

            <!-- Properties -->
            <vs-tab :label="getFormSectionTitle('properties')">
                <div class="con-tab pt-3">
                    <div class="vx-col w-full">
                        <div class="vx-row mb-6">
                            <div class="vx-col w-full">
                                <p class="font-bold text-sm mb-2">
                                    {{ getPropertyTitle('visitors') }}
                                </p>
                                <vs-input type="text" class="w-full" v-model="product.properties.visitors" />
                            </div>
                        </div>
                        <div class="vx-row mb-6">
                            <div class="vx-col w-full">
                                <p class="font-bold text-sm mb-2">
                                    {{ getPropertyTitle('location') }}
                                </p>
                                <vs-input type="text" class="w-full" v-model="product.properties.location" />
                            </div>
                        </div>
                        <div class="vx-row mb-6">
                            <div class="vx-col w-full">
                                <p class="font-bold text-sm mb-2">
                                    {{ getPropertyTitle('duration') }}
                                </p>
                                <vs-input type="text" class="w-full" v-model="product.properties.duration" />
                            </div>
                        </div>
                        <div class="vx-row mb-6">
                            <div class="vx-col w-full">
                                <p class="font-bold text-sm mb-2">
                                    {{ getPropertyTitle('weather') }}
                                </p>
                                <vs-input type="text" class="w-full" v-model="product.properties.weather" />
                            </div>
                        </div>
                        <div class="vx-row mb-6">
                            <div class="vx-col w-full">
                                <p class="font-bold text-sm mb-2">
                                    {{ getPropertyTitle('zaGledaoce') }}
                                </p>
                                <vs-input type="text" class="w-full" v-model="product.properties.za_gledaoce" />
                            </div>
                        </div>
                        <div class="vx-row mb-6">
                            <div class="vx-col w-full">
                                <p class="font-bold text-sm mb-2">
                                    {{ getPropertyTitle('dressCode') }}
                                </p>
                                <vs-input type="text" class="w-full" v-model="product.properties.dress_code" />
                            </div>
                        </div>
                        <div class="vx-row mb-6">
                            <div class="vx-col w-full">
                                <p class="font-bold text-sm mb-2">
                                    {{ getPropertyTitle('additionalInformation') }}
                                </p>
                                <vs-textarea class="w-full" v-model="product.properties.additional_info"></vs-textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </vs-tab>

            <!-- Images -->
            <vs-tab :label="getFormSectionTitle('images')">
                <div class="con-tab pt-3">
                    <div class="vx-row mb-0">
                        <div class="vx-col w-full">
                            <image-upload multiple v-model="selectedImages"></image-upload>
                        </div>
                    </div>
                </div>
            </vs-tab>



            <!-- SEO -->
            <vs-tab :label="getFormSectionTitle('seo')">
                <div class="con-tab pt-3">
                    <div class="vx-col w-full">
                        <div class="vx-row mb-6">
                            <div class="vx-col w-full">
                                <p class="font-bold text-sm mb-2">
                                    {{ getPropertyTitle('seoTitle') }}
                                </p>
                                <vs-input type="text" class="w-full" v-model="product.seo_title" />
                            </div>
                        </div>
                        <div class="vx-row mb-6">
                            <div class="vx-col w-full">
                                <p class="font-bold text-sm mb-2">
                                    {{ getPropertyTitle('seoDescription') }}
                                </p>
                                <vs-textarea v-model="product.seo_description" class="mb-0" />
                            </div>
                        </div>
                        <div class="vx-row mb-6">
                            <div class="vx-col w-full">
                                <p class="font-bold text-sm mb-2">
                                    {{ getPropertyTitle('seoKeywords') }}
                                </p>
                                <vs-textarea v-model="product.seo_keywords" class="mb-0" />
                            </div>
                        </div>
                    </div>
                </div>
            </vs-tab>

            <!-- Product versions -->
            <vs-tab :label="getFormSectionTitle('versions')">
                <div class="con-tab pt-3">
                    <div class="vx-col w-full">
                        <div class="vx-row mb-3" v-show="versions.length > 0">
                            <div class="vx-col w-2/3">
                                <p class="font-bold text-sm">{{ getPropertyTitle('version.title') }}</p>
                            </div>
                            <div class="vx-col w-1/6">
                                <p class="font-bold text-sm">{{ getPropertyTitle('version.price') }}</p>
                            </div>
                            <div class="vx-col w-1/6">
                                <p class="font-bold text-sm">{{ getPropertyTitle('version.actions') }}</p>
                            </div>
                        </div>
                        <div class="vx-row mb-3 items-center" :key="index" v-for="version,index in versions">
                            <div class="vx-col w-2/3">
                                <p>{{ version.title }}</p>
                            </div>
                            <div class="vx-col w-1/6">
                                <p>{{ version.price + ' ' + defaultCurrency }}</p>
                            </div>
                            <div class="vx-col w-1/6">
                                <vs-button color="danger" icon="delete" @click="removeVersion(version.id)"></vs-button>
                            </div>
                        </div>
                        <div class="vx-row">
                            <div class="vx-col w-2/3 mb-3">
                                <p class="font-bold text-sm mb-3">{{ getPropertyTitle('version.search') }}</p>
                                <v-select v-model="selectedVersion" label="title" :options="products" :reduce="version => ({id: version.id, title: version.title, price: version.price})" @search="searchProducts"></v-select>
                            </div>
                            <div class="vx-col w-1/3 mb-3 flex items-end">
                                <vs-button @click="addVersion()">{{ $t('actions.addNew') }}</vs-button>
                            </div>
                        </div>
                    </div>
                </div>
            </vs-tab>

            <!-- Settings -->
            <vs-tab :label="getFormSectionTitle('settings')">
                <div class="con-tab pt-3">
                    <div class="vx-col w-full">
                        <div class="vx-row mb-6">
                            <div class="vx-col w-1/4">
                                <p class="font-bold text-sm mb-2">
                                    {{ getPropertyTitle('viewCount') }}
                                </p>
                                <div class="w-2/3">
                                    <vs-input-number min="0" v-model="product.view_count"/>
                                </div>
                                <span class="text-danger text-xs" v-show="$v.product.view_count.$invalid">{{ $t('messages.validation.invalidField') }}</span>
                            </div>
                            <div class="vx-col w-1/4">
                                <p class="font-bold text-sm mb-2">
                                    {{ getPropertyTitle('likeCount') }}
                                </p>
                                <div class="w-2/3">
                                    <vs-input-number min="0" v-model="product.like_count"/>
                                </div>
                                <span class="text-danger text-xs" v-show="$v.product.like_count.$invalid">{{ $t('messages.validation.invalidField') }}</span>
                            </div>
                        </div>
                        <div class="vx-row mb-6">
                            <div class="vx-col w-full">
                                <p class="font-bold text-sm mb-2">
                                    {{ getPropertyTitle('type') }}
                                </p>
                                <vs-select
                                        class="w-full"
                                        v-model="product.type"
                                >
                                    <vs-select-item :key="index" :value="item.slug" :text="item.title" v-for="item,index in types" />
                                </vs-select>
                            </div>
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

    //Event bus for sending and processing global events
    import EventBus from '../../EventBus';

    //Product model, validations and types
    import { model, validations, productTypes } from "@/static/product/product";

    //Form helper functions
    import formHelper from "@/mixins/forms/helper";

    //Vuesax card component
    import VxCard from "../../components/vx-card/VxCard";

    //Image manager
    import ImageUpload from '../../components/images/ImageUpload';

    //Vue select
    import vSelect from 'vue-select'

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
        ['link']
    ];

    //Open image uploader
    function openImageUploader(){

        EventBus.$emit('open-image-uploader', true);

    }

    export default {
        components: {VxCard, ImageUpload, vSelect, quillEditor, ImageUpload},
        mixins: [ formHelper ],
        props: {
            isEditForm: Boolean,
            formModel: {

                type: String,
                default: 'product'

            },
            indexRoute: {

                type: String,
                default: 'products'

            },
            statuses: {
                type: Array,
                default: function() {

                    return [

                        {
                            title: 'Published',
                            value: true
                        },
                        {
                            title: 'Hidden',
                            value: false
                        }

                    ];

                }
            }
        },
        data() {

            return {

                product: model,
                defaultCurrency: applicationParams.defaultCurrency,
                selectedCategories: [],
                selectedFilter: {},
                selectedImages: [],
                productFilters: [],
                types: productTypes,
                versions: [],
                selectedVersion: {
                    id: '',
                    title: ''
                },
                // Quill Option
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
            //Products
            createProduct(){

                //Prepare product data
                this.assembleProduct();

                let requestParams = this.product;

                axios.post(this.API[this.instance].create, requestParams).then(response => {

                    if(response.data.message === 'success'){

                        this.showNotification('success', 'request.createdSuccess', 'success');

                        let id = response.data.id;

                        //Refresh the form
                        this.getSingleProduct(id);

                        //Save product versions
                        this.createVersions(id);

                        //Change the form type
                        this.isEditForm = true;

                    }
                    else{

                        this.showNotification('error', 'request.error', 'danger');

                    }

                });

            },
            updateProduct(){

                //Prepare product data
                this.assembleProduct();

                let requestParams = this.product;

                let product_id = this.product.id;

                axios.put(this.API[this.instance].update + '/' + product_id, requestParams).then(response => {

                    if(response.data === 'success'){

                        this.showNotification('success', 'request.updatedSuccess', 'success');

                    }
                    else{

                        this.showNotification('error', 'request.error', 'danger');

                    }

                });

            },
            getSingleProduct(id){

                let product_id = id;

                if(id === undefined){

                    product_id = this.$route.params.productId;

                }

                let requestParams = {

                    params: {

                        product_id: product_id

                    }

                };

                axios.get(this.API[this.instance].single, requestParams).then(response => {
                    this.product = response.data;
                    this.product.properties = JSON.parse(response.data.properties);
                    this.selectedCategories = this.normalizeData(response.data.categories);
                    this.selectedProducent = response.data.producent;
                    this.versions = response.data.children;
                    this.updateImages(response.data.images);
                    this.prepareAttributes();
                });

            },
            assembleProduct(){

                const product = this.product;

                //Images
                product.images = [];

                this.selectedImages.forEach(function(image){

                    product.images.push(image.id);

                });

                //Categories
                product.categories = this.selectedCategories;

                //Attributes
                let attributes = [];

                this.productFilters.forEach(function(filter){

                    filter.selected.forEach(function(attribute){

                        attributes.push(attribute.id);

                    });

                });

                this.product.attributes = attributes;


            },
            //Product versions
            addVersion(){

                let versionId = this.selectedVersion.id;

                //Push selected version to versions
                if(versionId !== ''){

                    let exisitngVersion = this.versions.find(function (item) {

                        return item.id === versionId;

                    });

                    if(exisitngVersion === undefined){

                        let productId = this.product.id;

                        if(productId !== versionId || productId === undefined){

                            this.versions.push(this.selectedVersion);

                            if(this.isEditForm){

                                //Save a version
                                this.saveVersion(productId, versionId);

                            }

                        }

                    }

                }

            },
            removeVersion(id){

                let version = this.versions.find(function(item){

                    return item.id === id;

                });

                let position = this.versions.indexOf(version);

                if(this.isEditForm){

                    let requestBase = this.API[this.instance].update;

                    let requestUrl = requestBase + '/' + version.id;

                    let requestParams = {

                        product_id: null

                    };

                    axios.put(requestUrl, requestParams).then(
                        response => {

                            if (response.data === 'success') {

                                this.showNotification('success', 'request.removedSuccess', 'success', 'productVersion');

                            }

                        })
                        .catch(
                            error => {

                                this.showNotification('success', 'request.error', 'danger');

                            }
                        );

                }

                this.versions.splice(position, 1);

            },
            createVersions(id){

                let product_id = id;

                this.versions.forEach(function(version){

                    //Save a version
                    this.saveVersion(product_id, version.id)

                });

            },
            saveVersion(product_id, version_id){

                let requestBase = this.API[this.instance].update;

                let requestUrl = requestBase + '/' + version_id;

                let requestParams = {

                    product_id: product_id

                };

                axios.put(requestUrl, requestParams).then(
                    response => {

                        if (response.data === 'success') {

                            this.showNotification('success', 'request.addedSuccess', 'success', 'productVersion');

                        }

                    })
                    .catch(
                        error => {

                            this.showNotification('success', 'request.error', 'danger');

                        }
                    );

            },
            //Filters and attributes
            addFilter(){

                let selectedFilter = this.selectedFilter;

                let filterId = selectedFilter.id;

                let filter = {
                    id: filterId,
                    name: selectedFilter.name,
                    attributes: selectedFilter.attributes,
                    selected: []
                };

                //Push selected filter to the list of product filters
                if(filterId !== ''){

                    let exisitngFilter = this.productFilters.find(function (item) {

                        return item.id === filterId;

                    });

                    if(exisitngFilter === undefined){

                        this.productFilters.push(filter);

                    }

                }

            },
            removeFilter(index){

                let filter = this.productFilters[index];

                filter.selected = [];

                this.productFilters.splice(index, 1);

            },
            prepareAttributes(){

                let filters = [];

                this.product.attributes.forEach(function (attribute) {

                    let attributeItem = {
                        id: attribute.id,
                        name: attribute.name
                    };

                    let filter = attribute.filter;

                    let existingFilter = filters.find(function(item){

                        return item.id === filter.id;

                    });

                    if(existingFilter === undefined){

                        filters.push({
                            id: filter.id,
                            name: filter.name,
                            attributes: filter.attributes,
                            selected: [attributeItem]
                        });

                    }
                    else{

                        existingFilter.selected.push(attributeItem);

                    }

                });

                this.productFilters = filters;

            },
            //Images
            removeImage(id){

                let selectedImages = this.selectedImages;

                let existingImage = selectedImages.find(function(item){

                    return item.id === id;

                });

                if(existingImage){

                    let  position = selectedImages.indexOf(existingImage);

                    selectedImages.splice(position, 1);

                    this.sendEvents();

                }

            },
            sendEvents(){

                //Send events
                EventBus.$emit('images-changed', this.selectedImages);

            },
            listenEvents(){

                //Listen to the events
                EventBus.$on('images-selected', this.updateImages);

            },
            updateImages(images){

                this.selectedImages = images;

            },
            loadData(){

                //Get producents list
                this.getProducents({params: {per_page: 1000}});

                //Get filter list with attributes
                this.getFilters({params: {per_page: 1000}});

                //Get categories list
                this.getCategories({params: {per_page: 1000}});

                //Get list of products
                this.searchProducts();

                //Get the product for editing
                if(this.isEditForm){

                    this.getSingleProduct();

                }

            },
            submitForm() {

                if(!this.$v.$invalid){

                    if(this.isEditForm){

                        this.updateProduct();

                    }
                    else{

                        this.createProduct();

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

            //Load necessary data
            this.loadData();

        },
        created: function () {

            //Set an instance for the form rendering
            this.setInstance(this.formModel);

            //Listen to the events
            this.listenEvents();

        }

    }

</script>



<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>



<style>
    .abr-form-images .abr-form-image{
        width: 24%;
        height: 200px;
        margin-right: 1%;
        margin-bottom: 20px;
        position: relative;
    }
    .abr-form-images .abr-form-image img{
        height: 100%;
    }
    .abr-form-images .abr-form-image .abr-image-btn{
        width: 35px;
        height: 35px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        cursor: pointer;
    }
    body .con-vs-tabs, body .con-vs-tabs .con-slot-tabs{
        overflow: visible;
    }
</style>