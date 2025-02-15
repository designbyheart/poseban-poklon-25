<template>
    <div>
        <textarea :cols="cols" :rows="rows" :maxlength="limit" class="item-comment-message"
                  :placeholder="placeholder" v-model="text"></textarea>
        <span class="item-comment-message-count">{{ charactersTyped }}/{{ maxCharacters }}</span>
    </div>
</template>

<script>
    module.exports = {
        name: 'TextareaWithCounter',
        props: {
            placeholder: {
                type: String,
                required: true
            },
            limit: {
                type: Number,
                required: true
            },
            cols: {
                type: Number,
                default: 30
            },
            rows: {
                type: Number,
                default: 10
            }
        },
        data: function() {
            return {
                text: '',
                maxCharacters: 100,
            }
        },
        watch: {
            'text': function(value){

                this.$emit('input', this.text);

            }
        },
        computed: {
            charactersRemaining: function () {
                return this.maxCharacters - this.text.length;
            },
            charactersTyped: function () {
                return this.text.length;
            }
        },
        mounted: function () {
            this.maxCharacters = this.limit;
        }
    }
</script>