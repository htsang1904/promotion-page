// src/api/user/controllers/custom-login.js
module.exports ={
  async login(ctx) {
    const { name, phone } = ctx.request.body;

    if (!name || !phone) {
      return ctx.badRequest('Name and phone number are required');
    }
    try {
      const existingUser = await strapi.entityService.findMany('api::authuser.authuser', {
        filters: { phone },
        limit: 1,
      });

      if (existingUser && existingUser.length > 0) {
        return ctx.send(existingUser[0]);
      } else {
        const newUser = await strapi.entityService.create('api::authuser.authuser', {
          data: { name, phone }
        });

        return ctx.send(newUser);
      }
    } catch (error) {
      console.error(error);
      return ctx.internalServerError('An error occurred');
    }
  },
};
