// src/api/user/controllers/custom-login.js
const axios = require('axios');

const linkAccount = async (name, phone, zlid ) =>{
  let now = new Date()
  let timestamp = now.getTime()
  let nameArr = name.split(" ").filter(item => item !== "")
  let firstName = nameArr.pop();
  let lastName = nameArr.join(" ")
  let newPhone = phone.replace(/^84/, "0");
  let data = {
      sourceCode: process.env.SOURCECODE,
      partnerUserId: zlid,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: newPhone,
      dateOfBirth: null,
      timestamp: timestamp
  }
  let token = process.env.TOKEN
  let linkUrl = process.env.LINK_USER_URL
  let res = await axios.post(`${linkUrl}/public/user/link `, data, {
      headers: {
          Authorization: 'Bearer ' + token,
      }
  })
  if (res.data.success) {
      console.log(res.data.user.id);
      return  String(res.data.user.id)
}else{
  console.log(res.data);
  
}
}
module.exports ={
  async login(ctx) {
    const { name, phone ,zlid } = ctx.request.body;

    if (!name || !phone) {
      return ctx.badRequest('Name and phone number are required');
    }
    try {
      const existingUser = await strapi.entityService.findMany('api::authuser.authuser', {
        filters: { phone },
        limit: 1,
      });
      if (existingUser && existingUser.length > 0) {
        if (existingUser[0].zlid !== null) {
          if (existingUser[0].platformUserId === null) {
            const platformUserId = await linkAccount(existingUser[0].name, existingUser[0].phone, existingUser[0].zlid)
            console.log("platformUserId",platformUserId);
            
            const updatedUser = await strapi.entityService.update(
              'api::authuser.authuser',
              existingUser[0].id,
              { data: { platformUserId } }
            );
            console.log(updatedUser);
            return ctx.send(existingUser[0]);
          }else{
            return ctx.send(existingUser[0]);
          }
        }else{
          if (existingUser[0].platformUserId === null) {
              const platformUserId = await linkAccount(existingUser[0].name, existingUser[0].phone, existingUser[0].zlid)
              const updatedUser = await strapi.entityService.update(
                'api::authuser.authuser',
                existingUser[0].id,
                { data: { zlid,platformUserId } }
              );
            return ctx.send(updatedUser);
          }else{
            const updatedUser = await strapi.entityService.update(
              'api::authuser.authuser',
              existingUser[0].id,
              { data: { zlid } }
            );
          return ctx.send(updatedUser);
          }    
        }
      } else {
        const platformUserId = await linkAccount(name, phone, zlid)
        const newUser = await strapi.entityService.create('api::authuser.authuser', {
          data: { name, phone, zlid , platformUserId}
        });
        return ctx.send(newUser);
      }
    } catch (error) {
      console.error(error);
      return ctx.internalServerError('An error occurred');
    }
  },

  async linkAllUser (ctx) {
    try {
    const allUser = await strapi.entityService.findMany('api::authuser.authuser', {
      select: ['name', 'phone', 'zlid'],
    });
    let listUser = allUser
    for (let index = 0; index < listUser.length; index++) {
      let platformUserId = await linkAccount(listUser[index].name,listUser[index].phone,listUser[index].zlid)
      const updatedUser = await strapi.entityService.update(
        'api::authuser.authuser',
        listUser[index].id,
        { data: { platformUserId } }
      );
    }
    
    return ctx.send(allUser.length);
  }catch (error) {
      console.error(error);
      return ctx.internalServerError('An error occurred');
    }
  }
};



