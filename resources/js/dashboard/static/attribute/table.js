export const tableSchema = {

    columns: [

        {
            model: 'name',
            sortKey: 'name'
        },
        {
            model: 'description'
        },
        {
            model: 'filter',
            sortKey: 'filter_id',
            isRelation: true,
            relationProperty: 'name'
        }


    ]

}