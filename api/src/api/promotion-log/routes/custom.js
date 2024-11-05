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
        },
        {
            method: 'GET',
            path: '/promotion-log',
            handler: 'promotion-log.getPromotionLog',
        },
        {
            method: 'GET',
            path: '/promotion-log/:code',
            handler: 'promotion-log.getPromotionDetail',
            config: {
              auth: false, // Nếu bạn muốn không yêu cầu xác thực
            },
          },
    ]
}