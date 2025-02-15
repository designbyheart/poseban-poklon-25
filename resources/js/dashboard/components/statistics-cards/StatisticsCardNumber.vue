<!-- =========================================================================================
    File Name: StatisticsCardNumber.vue
    Description: Statistics card number component
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
    Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <vx-card class="overflow-hidden">
        <div slot="no-body">
            <div class="p-6" :class="{'flex justify-between flex-row-reverse items-center': iconRight}">
                <feather-icon :icon="icon" class="p-3 inline-flex rounded-full" :class="[`text-${color}`, {'mb-4': !iconRight}]" :style="{background: `rgba(var(--vs-${color}),.15)`}"></feather-icon>
                <div>
                    <h2 class="mb-1 font-bold">{{ statistic }}</h2>
                    <span>{{ statisticTitle }}</span>
                </div>
            </div>
        </div>
    </vx-card>
</template>

<script>

    export default{
        props: {
            icon: {
                type: String,
                required: true
            },
            statistic: {
                type: [Number, String],
                required: true,
            },
            statisticTitle: {
                type: String,
            },
            color: {
                type: String,
                default: 'primary',
            },
            type: {
                type: String,
                default: 'line'
            },
            iconRight: {
                type: Boolean,
                default: false
            }
        },
        methods: {

        },
        created() {

        }
    }
</script>