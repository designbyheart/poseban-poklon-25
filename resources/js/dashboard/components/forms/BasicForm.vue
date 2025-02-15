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

                        <!-- Image upload component -->
                        <image-upload :selected-images="selectedImages" v-if="field.type === 'imageUpload'"></image-upload>

                        <!-- Validation text -->
                        <span class="text-danger text-xs" v-show="field.validates && validateField(field.model)">{{ $t('messages.validation.invalidField') }}</span>

                    </div>

                </div>

            </vs-tab>

        </vs-tabs>

        <!-- Actions -->
        <div class="vx-row">
            <div class="vx-col w-full">
                <vs-button color="primary" class="mr-3 mb-2" @click="submitForm()" v-if="!isEditForm">{{ $t('actions.create') }}</vs-button>
                <vs-button color="primary" class="mr-3 mb-2" @click="submitForm()" v-if="isEditForm">{{ $t('actions.update') }}</vs-button>
                <vs-button color="danger" type="border" class="mb-2" :to="{ name: 'shipping_methods' }">{{ $t('actions.cancel') }}</vs-button>
            </div>
        </div>

    </vx-card>

</template>
<script>

    //Image manager
    import ImageUpload from '../../components/images/ImageUpload';

    export default {
        name: 'BasicForm',
        components: {ImageUpload},
        props: {
            isEditForm: {
                type: Boolean,
                default: false
            },
            instance: {
                type: String,
                default: ''
            },
            formStructure: {
                type: Object
            },
            model: {
                type: Object
            },
            validations: {
                type: Object
            }
        },
        validations() {

            return this.validations

        },
        methods: {
            getFormTitle(isEdit){

                if(isEdit){

                    return this.$t('forms.' + this.instance + '.titles.edit');

                }
                else{

                    return this.$t('forms.' + this.instance + '.titles.create');

                }

            },
            getSectionTitle(slug){

                return this.$t('forms.' + this.instance + '.sections.' + slug + '.label');

            },
            getFieldLabel(section, field){

                return this.$t('forms.' + this.instance + '.sections.' + section + '.fields.' + field);

            },
            validateField(field){


                if(this.$v.model[field]){

                    return this.$v.model[field].$invalid;

                }

            }
        }
    }

</script>