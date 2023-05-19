module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/promotion/promotion-list',
            handler: 'promotion.getPromotions',
        }
    ]
}