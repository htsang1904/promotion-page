module.exports = {
    routes: [
        {
            method: 'POST',
            path: '/promotion-log/get-qr-code',
            handler: 'promotion-log.getQrCode',
        },
        {
            method: 'POST',
            path: '/promotion-log/create-promotion-log',
            handler: 'promotion-log.createPromotionLog',
        }
    ]
}