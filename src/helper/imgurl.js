const API_URL = process.env.VUE_APP_API_URL
let imgUrl = (value) => {
    if (!value) {
        return '/assets/images/no-image.png';
    }
    if (value.provider === 'local' || value.provider === 'local-watermark') {
        return API_URL + value.url;
    } else  {
        return value.url;
    }
}

export default imgUrl