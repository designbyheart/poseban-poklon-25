export default {
    data() {
        return {
            moreParams: {
                search: null
            }
        };
    },
    methods: {
        onPaginationData(paginationData) {
            this.$refs.pagination.setPaginationData(paginationData);
            this.$refs.paginationInfo.setPaginationData(paginationData);
        },
        onChangePage(page) {
            this.$refs.vuetable.changePage(page);
        },
        reloadTable() {
            this.$nextTick(() => {
                // this is required because vuetable uses tableFields internally, not fields
                this.vuetable.normalizeFields();
                this.vuetable.reload();
            });
        }
    }
};