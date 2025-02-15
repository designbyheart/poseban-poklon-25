<template>

    <div class="vx-row">

        <div class="vx-col w-full">

            <div class="vx-row">

                <div class="vx-col w-full flex justify-content-between items-center mb-6">

                    <h3 class="mr-3">{{ getLabel('edit') }}</h3>

                    <vs-button color="success" icon="check" @click="saveLayout()">{{ $t('actions.save') }}</vs-button>

                </div>

            </div>

            <!--Slider-->
            <div class="vx-row mb-6">

                <div class="vx-col w-full" v-show="!forms.slider.active">

                    <div class="abr-editor-block bg-primary flex justify-center items-center cursor-pointer" @click="toggleForm('slider')">

                        <h3 class="text-white">{{ getLabel('slider.sectionTitle') }}</h3>

                    </div>

                </div>

                <div class="vx-col w-full p-3" v-show="forms.slider.active">

                    <div class="vx-row bg-white mb-3 mx-0 p-3">

                        <div class="vx-col w-full flex items-center justify-between">

                            <h3>{{ getLabel('slider.edit') }}</h3>

                            <vs-button icon="check" color="success" type="border" @click="toggleForm('slider')"></vs-button>

                        </div>

                    </div>

                    <div class="vx-row bg-white mb-3 mx-0 p-3" :key="index" v-for="slide,index in pageStructure.slider.slides">

                        <div class="vx-col w-full flex justify-between mb-3">

                            <h3 class="mr-3">{{ getLabel('slider.modelTitle') + ' ' + (index + 1) }}</h3>

                            <vs-button icon="delete" color="danger" @click="removeSlide(index)"></vs-button>

                        </div>

                        <div class="vx-col w-1/2">

                            <p class="mb-2">{{ getLabel('slider.title') }}</p>
                            <vs-input
                                    type="text"
                                    v-model="slide.title"
                                    class="w-full mb-3"
                            >
                            </vs-input>

                            <p class="mb-2">{{ getLabel('slider.subtitle') }}</p>
                            <vs-input
                                    type="text"
                                    v-model="slide.subtitle"
                                    class="w-full mb-3"
                            >
                            </vs-input>

                            <p class="mb-2">{{ getLabel('slider.buttonText') }}</p>
                            <vs-input
                                    type="text"
                                    v-model="slide.buttonText"
                                    class="w-full mb-3"
                            >
                            </vs-input>

                            <p class="mb-2">{{ getLabel('slider.link') }}</p>
                            <vs-input
                                    type="url"
                                    v-model="slide.link"
                                    class="w-full mb-3"
                            >
                            </vs-input>

                        </div>

                        <div class="vx-col w-1/2">

                            <p class="mb-2">{{ getLabel('slider.image') }}</p>

                            <image-upload v-model="slide.image" preview-width="100%"></image-upload>

                        </div>

                    </div>

                    <div class="vx-row mx-0">

                        <div class="vx-col w-full px-0">

                            <vs-button @click="addSlide" icon="add"></vs-button>

                        </div>

                    </div>

                </div>

            </div>
            <!--End slider-->

            <!--Categories-->
            <div class="vx-row mb-6">
                <div class="vx-col w-full">
                    <div class="flex justify-center items-center" v-if="!pageStructure.sectionTitles.category.edit">
                        <h2 class="mr-3">
                            {{ pageStructure.sectionTitles.category.value }}
                        </h2>
                        <vs-button icon="edit" size="small" type="border" @click="editSectionTitle('category')"></vs-button>
                    </div>
                    <div class="flex justify-center items-center" v-if="pageStructure.sectionTitles.category.edit">
                        <vs-input
                                type="text"
                                v-model="pageStructure.sectionTitles.category.value"
                                class="w-1/2 mr-3"
                        >
                        </vs-input>
                        <vs-button icon="check" size="small" type="border" @click="editSectionTitle('category')"></vs-button>
                    </div>
                </div>
            </div>
            <div class="vx-row mb-6" v-show="!forms.category.active">

                <div class="vx-col w-3/4">

                    <div class="vx-row mb-3">

                        <div class="vx-col w-2/3">
                            <div class="abr-category bg-primary flex justify-center items-center cursor-pointer" @click="categoryForm(1)">
                                <h3 class="text-white">{{ pageStructure.categories.items[0].title }}</h3>
                            </div>
                        </div>

                        <div class="vx-col w-1/3 p-0">
                            <div class="abr-category bg-primary flex justify-center items-center cursor-pointer" @click="categoryForm(2)">
                                <h3 class="text-white">{{ pageStructure.categories.items[1].title }}</h3>
                            </div>
                        </div>

                    </div>

                    <div class="vx-row">

                        <div class="vx-col w-1/3">
                            <div class="abr-category bg-primary flex justify-center items-center cursor-pointer" @click="categoryForm(3)">
                                <h3 class="text-white">{{ pageStructure.categories.items[2].title }}</h3>
                            </div>
                        </div>

                        <div class="vx-col w-2/3 p-0">
                            <div class="abr-category bg-primary flex justify-center items-center cursor-pointer" @click="categoryForm(4)">
                                <h3 class="text-white">{{ pageStructure.categories.items[3].title }}</h3>
                            </div>
                        </div>

                    </div>

                </div>

                <div class="vx-col w-1/4">

                    <div class="abr-category bg-primary h-full flex justify-center items-center cursor-pointer" @click="categoryForm(5)">
                        <h3 class="text-white">{{ pageStructure.categories.items[4].title }}</h3>
                    </div>

                </div>

            </div>
            <!--Categories form-->
            <div class="vx-row mb-6" v-show="forms.category.active">
                <div class="vx-col w-full p-3">

                    <div class="vx-row bg-white mb-3 mx-0 p-3">

                        <div class="vx-col w-full flex items-center justify-between">

                            <h3>{{ getLabel('categories.edit') }}</h3>

                            <vs-button icon="check" color="success" type="border" @click="categoryForm()"></vs-button>

                        </div>

                    </div>

                    <div class="vx-row bg-white mx-0 p-3">

                        <div class="vx-col w-full flex justify-between mb-3">

                            <h3 class="mr-3">{{ getLabel('categories.modelTitle') + ' ' + selectedCategory.index }}</h3>

                        </div>

                        <div class="vx-col w-1/2">

                            <div class="vx-row">

                                <div class="vx-col w-full mb-3">

                                    <p class="mb-2">{{ getLabel('categories.title') }}</p>
                                    <vs-input
                                            type="text"
                                            v-model="selectedCategory.title"
                                            class="w-full"
                                    >
                                    </vs-input>

                                </div>

                                <div class="vx-col w-full mb-3">

                                    <p class="mb-2">{{ getLabel('categories.subtitle') }}</p>
                                    <vs-input
                                            type="text"
                                            v-model="selectedCategory.subtitle"
                                            class="w-full"
                                    >
                                    </vs-input>

                                </div>

                                <div class="vx-col w-full mb-3">

                                    <p class="mb-2">{{ getLabel('categories.showButton') }}</p>
                                    <vs-switch color="success" v-model="selectedCategory.showButton" />

                                </div>

                                <div class="vx-col w-full mb-3" v-if="selectedCategory.showButton">

                                    <p class="mb-2">{{ getLabel('categories.buttonText') }}</p>
                                    <vs-input
                                            type="text"
                                            v-model="selectedCategory.buttonText"
                                            class="w-full"
                                    >
                                    </vs-input>

                                </div>

                                <div class="vx-col w-full mb-3">

                                    <p class="mb-2">{{ getLabel('categories.link') }}</p>
                                    <vs-input
                                            type="text"
                                            v-model="selectedCategory.link"
                                            class="w-full"
                                    >
                                    </vs-input>

                                </div>

                            </div>

                        </div>

                        <div class="vx-col w-1/2">

                            <p class="mb-2">{{ getLabel('categories.image') }}</p>
                            <image-upload :key="selectedCategory.index" v-model="selectedCategory.image" preview-width="100%"></image-upload>

                        </div>

                    </div>

                </div>
            </div>
            <!--End categories-->

            <!--About us-->
            <div class="vx-row mb-6">

                <div class="vx-col w-full" v-if="!forms.aboutUs.active">
                    <div class="abr-editor-block bg-primary flex justify-center items-center cursor-pointer" @click="toggleForm('aboutUs')">

                        <h3 class="text-white">{{ pageStructure.aboutUs.title }}</h3>

                    </div>
                </div>

                <div class="vx-col w-full" v-if="forms.aboutUs.active">

                    <div class="vx-row bg-white mb-3 mx-0 p-3">

                        <div class="vx-col w-full flex items-center justify-between">

                            <h3>{{ getLabel('aboutUs.edit') }}</h3>

                            <vs-button icon="check" color="success" type="border" @click="toggleForm('aboutUs')"></vs-button>

                        </div>

                    </div>

                    <div class="vx-row bg-white mb-3 mx-0 p-3">

                        <div class="vx-col w-full mb-3">

                            <p class="mb-2">{{ getLabel('aboutUs.title') }}</p>
                            <vs-input
                                    type="text"
                                    v-model="pageStructure.aboutUs.title"
                                    class="w-full"
                            >
                            </vs-input>

                        </div>

                        <div class="vx-col w-full mb-3">

                            <p class="mb-2">{{ getLabel('aboutUs.description') }}</p>
                            <vs-textarea v-model="pageStructure.aboutUs.description" class="w-full textarea-high"></vs-textarea>

                        </div>

                        <div class="vx-col w-full mb-3">

                            <p class="mb-2">{{ getLabel('aboutUs.image') }}</p>
                            <image-upload v-model="pageStructure.aboutUs.image" preview-width="100%"></image-upload>

                        </div>

                    </div>

                </div>

            </div>
            <!--End about section-->

            <div class="vx-row mb-6">

                <div class="vx-col w-full" v-if="!forms.bottomLink.active">

                    <div class="vx-row">

                        <div class="vx-col w-1/4" :key="index" v-for="item, index in pageStructure.bottomLinks">

                            <div class="abr-editor-block h-32 bg-primary flex justify-center items-center cursor-pointer" @click="linkForm(index)">

                                <p class="text-white">{{ item.title }}</p>

                            </div>

                        </div>

                    </div>

                </div>

                <div class="vx-col w-full" v-if="forms.bottomLink.active">

                    <div class="vx-row bg-white mb-3 mx-0 p-3">

                        <div class="vx-col w-full flex items-center justify-between">

                            <h3>{{ getLabel('bottomLinks.edit') }}</h3>

                            <vs-button icon="check" color="success" type="border" @click="linkForm()"></vs-button>

                        </div>

                    </div>

                    <div class="vx-row bg-white mb-3 mx-0 p-3">

                        <div class="vx-col w-full mb-3">

                            <p class="mb-2">{{ getLabel('bottomLinks.title') }}</p>
                            <vs-input
                                    type="text"
                                    v-model="selectedBottomLink.title"
                                    class="w-full"
                            >
                            </vs-input>

                        </div>

                        <div class="vx-col w-full mb-3">

                            <p class="mb-2">{{ getLabel('bottomLinks.link') }}</p>
                            <vs-input
                                    type="text"
                                    v-model="selectedBottomLink.link"
                                    class="w-full"
                            >
                            </vs-input>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</template>

<style>

    body .abr-editor-block{

        width: 100%;
        height: 250px;

    }

    body .abr-category{

        width: 100%;
        height: 250px;

    }

    body div.textarea-high textarea{
        height: 400px;
    }

</style>

<script>

    //Library for sending requests
    import axios from 'axios';

    //Application routes
    import { API } from "../../mixins/api/api";

    //Import page structure and necessary data
    import { structure, slideModel } from "../../static/builder/home";

    //Image uploader
    import ImageUpload from '../../components/images/ImageUpload';

    export default {
        components: {ImageUpload},
        props: {
          instance: {
              type: String,
              default: 'builderLayout'
          }
        },
        data() {

            return {
                builderLayout: {
                    slug: 'home'
                },
                pageStructure: structure,
                selectedCategory: {},
                selectedBottomLink: {},
                forms: {
                    slider: {
                        active: false
                    },
                    category: {
                        active: false
                    },
                    aboutUs: {
                        active: false
                    },
                    bottomLink: {
                        active: false
                    }
                },
                API
            }

        },
        methods: {
            saveLayout(){

                let requestUrl = this.API.builderLayout.update;

                let requestParams = {

                    slug: this.builderLayout.slug,
                    content: JSON.stringify(this.pageStructure)

                };

                axios.put(requestUrl, requestParams)
                    .then(

                        response => {

                            if (response.data === 'success') {

                                this.showNotification(this.instance, 'success', 'request.updatedSuccess', 'success');

                            }

                    })
                    .catch(
                        error => {

                            this.showNotification(this.instance, 'error', 'request.error', 'danger');

                        }
                    );

            },
            getLayout(){

                let requestUrl = this.API.builderLayout.single;

                let requestParams = {
                    params: {

                        slug: this.builderLayout.slug

                    }
                };

                axios.get(requestUrl, requestParams)
                    .then(

                        response => {

                            //Set a data for builder
                            this.pageStructure = JSON.parse(response.data.content);

                        });

            },
            toggleForm(slug){

                let form = this.forms[slug];

                if(form !== undefined){

                    let status = form.active;

                    form.active = !status;

                }

            },
            categoryForm(id){

                if(id !== undefined){

                    let category = this.pageStructure.categories.items.find(function(item){

                        return item.index === id;

                    });

                    this.selectedCategory = category;

                }
                else{

                    this.selectedCategory = Object.assign({}, {});

                }

                this.toggleForm('category');

            },
            linkForm(index){

                if(index !== undefined) {

                    this.selectedBottomLink = this.pageStructure.bottomLinks[index];

                }
                else{

                    this.selectedBottomLink = Object.assign({}, {});

                }

                this.toggleForm('bottomLink');

            },
            editSectionTitle(slug){

                let sectionTitle = this.pageStructure.sectionTitles[slug];

                let editStatus = sectionTitle.edit;

                sectionTitle.edit = !editStatus;

            },
            addSlide(){

                let newSlide = Object.assign({}, slideModel);

                this.pageStructure.slider.slides.push(newSlide);

            },
            removeSlide(index){

                this.pageStructure.slider.slides.splice(index, 1);

            },
            getLabel(slug){

                return this.$t('builder.home.' + slug);

            }
        },
        mounted(){

            //Get layout
            this.getLayout();

        }
    }

</script>