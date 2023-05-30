'use strict';

/**
 * promotion-log controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::promotion-log.promotion-log', ({strapi}) => ({
    async getQrCode(ctx) {
        let userInfo = ctx.request.body
        let getQrCode = await strapi.entityService.findMany('api::promotion.promotion', {
            filters: {
                id: userInfo.promotion_id
            }
        })
        if(getQrCode) {
            let createLog = await strapi.entityService.create('api::promotion-log.promotion-log', {
                data: {
                    qr_code: 'abc'
                }
            })
            return createLog
        }
    },
    async createPromotionLog(ctx) {
        let userID = ctx.request.header.cookie
        console.log(userID)
    },
    
}));
