'use strict';

/**
 * promotion controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::promotion.promotion', ({strapi}) => ({
    async getPromotions() {
        let promotionList = await strapi.entityService.findMany('api::promotion.promotion', {
            populate: {banner_img: true, popup_img: true},
            filters: {
                isActive: true
            }
        })
        return promotionList
    }
}));
