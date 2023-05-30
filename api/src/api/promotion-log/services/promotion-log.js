'use strict';

/**
 * promotion-log service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::promotion-log.promotion-log');
