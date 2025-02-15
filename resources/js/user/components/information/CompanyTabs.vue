<template>

    <section class="information-company-tabs container">
        <div class="row">
            <div class="col-lg-12 tabs-row">
                <div class="col-tabs" @click="changeActiveTab(1)">
                    <div class="tabs-red-row">
                        <h3 class="tabs-red-title">Gift Cards and Bon</h3>
                    </div>
                    <img src="images/tabs-1.jpg" alt="" class="tabs-image">
                </div>
                <div class="col-tabs" @click="changeActiveTab(2)">
                    <div class="tabs-red-row">
                        <h3 class="tabs-red-title">Gift sets for all</h3>
                    </div>
                    <img src="images/tabs-2.jpg" alt="" class="tabs-image">
                </div>
                <div class="col-tabs" @click="changeActiveTab(3)">
                    <div class="tabs-red-row">
                        <h3 class="tabs-red-title">Vouchery</h3>
                    </div>
                    <img src="images/tabs-3.jpg" alt="" class="tabs-image">
                </div>
            </div>
            <div class="col-lg-12 tabs-content-row">
                <div class="col-content-tabs tabs-left" style="display: none;" v-show="activeTab === 1">
                    <div class="content-tabs">
                        <h3 class="content-tabs-title">
                            Gift
                        </h3>
                        <p class="content-tabs-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sunt
                            ullam nemo iste provident, harum aperiam, tenetur hic commodi ex quidem est voluptatibus
                            officiis rerum, veritatis at! Reiciendis, veritatis obcaecati?</p>
                        <div class="content-tabs-btn">
                            <a href="#" class="tabs-btn">
                                Button
                            </a>
                            <button class="tabs-btn">Button</button>
                        </div>
                    </div>
                </div>
                <div class="col-content-tabs tabs-center" style="display: none;" v-show="activeTab === 2">
                    <div class="content-tabs">
                        <h3 class="content-tabs-title">
                            Gift
                        </h3>
                        <p class="content-tabs-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sunt
                            ullam nemo iste provident, harum aperiam, tenetur hic commodi ex quidem est voluptatibus
                            officiis rerum, veritatis at! Reiciendis, veritatis obcaecati?</p>
                        <div class="content-tabs-btn">
                            <a href="#" class="tabs-btn">
                                Button
                            </a>
                            <button class="tabs-btn">Button</button>
                        </div>
                    </div>
                </div>
                <div class="col-content-tabs tabs-right" v-show="activeTab === 3">
                    <div class="content-tabs">
                        <h3 class="content-tabs-title">
                            Gift
                        </h3>
                        <p class="content-tabs-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni sunt
                            ullam nemo iste provident, harum aperiam, tenetur hic commodi ex quidem est voluptatibus
                            officiis rerum, veritatis at! Reiciendis, veritatis obcaecati?</p>
                        <div class="content-tabs-btn">
                            <a href="#" class="tabs-btn">
                                Button
                            </a>
                            <button class="tabs-btn">Button</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>

    export default {
        name: 'CompanyTabs',
        data(){
            return {

                activeTab: 1

            }
        },
        methods: {

            changeActiveTab(id){

                this.activeTab = id;

            }

        }
    }

</script>