// src/api/user-webhook/controllers/user-webhook.js

module.exports = {
    async handleWebhook(ctx) {
      try {
        const { body } = ctx.request;
        const { event} = body; 
        if (event === 'user.revoke.consent') {
          console.log(body);
          ctx.send({ message: 'User data revoked' });
        } else if (event === 'versions.review.done') {
          console.log(body);
          ctx.send({ message: 'versions review done' });
        } else {
          console.log(body);
          ctx.send({ message: 'Event not handled' });
        }
      } catch (error) {
        ctx.throw(500, error);
      }
    },
  };
  