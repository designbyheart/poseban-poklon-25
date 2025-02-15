//Cart model
export const cartModel = {
    items: [],
    subtotal: 0,
    total: 0,
    productsCount: 0,
    currency: ''
};

//Cart item model
export const itemModel = {

    productId: '',
    title: '',
    slug: '',
    imageUrl: '',
    quantity: 1,
    price: 0,
    discountPrice: 0,
    total: 0,
    personalMessages: []

};