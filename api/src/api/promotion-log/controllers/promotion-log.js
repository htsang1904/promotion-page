'use strict';

/**
 * promotion-log controller
 */

const {createCoreController} = require('@strapi/strapi').factories;
const axios = require('axios');
const md5 = require('js-md5');
const SALTKEY = '8Q21kHR0KJ';

module.exports = createCoreController('api::promotion-log.promotion-log', ({
  strapi
}) => ({
  async getQrCode(ctx) {
    try {
      let request = ctx.request.body
      /* Check các valid fields */
      if (!request.hash || !request.time || !request.device_type) {
        return {
          success: false,
          message: 'Thiếu thông tin bắt buộc'
        }
      }
      let now = Math.floor(Date.now() / 1000)
      let hash = md5(request.time + request.device_type + SALTKEY)
      if (now - request.time > 10 || hash !== request.hash) {
        return {
          success: false,
          message: 'Request không hợp lệ'
        }
      }
      let promotionDetail = await strapi.entityService.findOne('api::promotion.promotion', request.promotion_id)
      if (promotionDetail) {
        if (promotionDetail.limit_per_day > 0) {
          let today = new Date()
          let todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
          let todayEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
          let promotionLogCount = await strapi.entityService.count('api::promotion-log.promotion-log', {
            populate: ['promotion'],
            filters: {
              promotion: {
                id: request.promotion_id
              },
              created_at: {
                $gte: todayStart,
                $lt: todayEnd
              },
            }
          })
          if (promotionLogCount >= promotionDetail.limit_per_day) {
            return {
              success: false,
              message: 'Mã khuyến mãi đã hết lượt sử dụng trong ngày, hãy thử lại vào ngày mai'
            }
          }
        }
        if (promotionDetail.limit_per_user && request.promotion_count && request.promotion_count >= promotionDetail.limit_per_user) {
          return {
            success: false,
            message: 'Bạn đã sử dụng hết lượt khuyến mãi hôm nay, hãy thử lại vào ngày mai'
          }
        }

        let platformEndpoint = strapi.config.get('platform.endpoint') + '/webapi/create_qr_code'
        let data = {
          'scheme_code': promotionDetail.scheme_code,
          'expire_days': promotionDetail.expire_days,
          'promotion_id': promotionDetail.id,
          'promotion_count': request.promotion_count
        }

        const postHeaders = {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + strapi.config.get('platform.token'),
        }

        let res = await axios.post(platformEndpoint, data, {
          headers: postHeaders
        })

        if (res.data && res.data.success) {
          let createLog = await strapi.entityService.create('api::promotion-log.promotion-log', {
            data: {
              scheme_code: promotionDetail.scheme_code,
              coupon_code: res.data.coupon_code,
              promotion: promotionDetail.id,
              expire_at: res.data.expire_at,
              device_type: request.device_type,
            }
          })
          delete createLog.id
          return {
            success: true,
            data: createLog
          }
        } else {
          return {
            success: false,
            message: res.data.message || 'Có lỗi xảy ra, vui lòng thử lại sau'
          }
        }

      }
      return {
        success: false,
        message: 'Không tìm thấy mã khuyến mãi'
      }
    } catch (e) {
      return {
        success: false,
        message: 'Có lỗi xảy ra, vui lòng thử lại sau'
      }
    }
  },

  async createPromotionLog(ctx) {
    let userID = ctx.request.header.cookie
    console.log(userID)
  },

}));
