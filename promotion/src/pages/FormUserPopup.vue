<template>
    <div class="Popup">
        <!-- <div class="headerPopup">Xác nhận thành viên</div> -->
        <div v-if="islogin === true">
            <div class="containerdatauser">
                <!-- <div class="backgroundHeader"></div> -->
                <div class="detailUserInfo">
                    <div class="containerAvatar">
                        <img class="avatarUser" :src="avatar" alt="">
                    </div>
                    <div class="usernameLogin">
                        <div class="usernameLogindetail">
                            <div>{{ userName }}</div>
                            <div class="phoneuserlogin">{{ phoneNumber }}</div>
                        </div>
                        <img class="imggift" src="../assets/gift.png" alt="">
                    </div>
                </div>
                <!-- <b-carousel :indicator="false">
                    <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                        <section class="hero is-medium">
                            <div>
                                <img class="imgslider" :src="carousel.thumb.path_url" alt="">
                            </div>
                        </section>
                    </b-carousel-item>
                </b-carousel> -->
                <div class="chatcontainer">
                    <div class="chatinfo">
                        <img class="imgbtnoa" src="../assets/home-logo.png" alt="">
                        <div class="titlebtnoa">Nhắn tin Zalo cho Guta Cafe</div>
                        <button class="btnchatbox" @click="openChatScreen">Nhắn tin cho Guta</button>
                    </div>
                </div>
                <div class="containermess">
                    <div>
                        <img class="imgconrat" src="../assets/congrat.png" alt="">
                    </div>
                    <div class="containerTitle">
                        <div><img class="logoiconandroid" src="../assets/open-gift.png" alt="">Bạn đã đăng
                            ký thành viên thành công, bắt đầu nhận quà thôi nào</div>
                    </div>
                </div>
                <div class="receive-btn">
                    <button class="pushable" @click="goToHome">
                        <span class="front">Nhận ưu đãi ngay</span>
                    </button>
                </div>
            </div>
        </div>
        <div v-if="islogin === false">
            <!-- <b-carousel :indicator="false">
                <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
                    <section class="hero is-medium">
                        <div>
                            <img class="imgslider" :src="carousel.thumb.path_url" alt="">
                        </div>
                    </section>
                </b-carousel-item>
            </b-carousel> -->
            <div class="titleheaderform">
                <img class="logoiconandroid" src="../assets/open-gift.png" alt=""> Đăng ký thành viên để có thể nhận
                ngay các mã voucher giảm giá đến từ Guta Cafe nhé!
            </div>
            <div class="containerform">
                <div class="forminput">
                    <div class="title">
                        <b-icon pack="fas" icon="user" class="iconForm">
                        </b-icon> Tên của bạn <span class="musthave">*</span>
                    </div>
                    <div class="inputcontainer" @click="openmodleauthen">
                        <input class="inputvalue" onfocus="this.blur()" v-model="userName" type="text"
                            placeholder="Nhập tên người dùng">
                    </div>
                </div>
                <div class="forminput">
                    <div class="title"><b-icon pack="fas" icon="phone" class="iconForm">
                        </b-icon> Số điện thoại <span class="musthave">*</span>
                    </div>
                    <div class="inputcontainer" @click="getphone">
                        <input type="number" onfocus="this.blur()" v-model="phoneNumber" class="inputvalue"
                            placeholder="Bấm vào để cấp SĐT">
                    </div>
                </div>

                <div v-if="followedOA === false">
                    <div class="valuefooter">
                        Theo dõi ngay Zalo OA Guta Cafe để nhận được nhiều thông báo ưu đãi hấp dẫn. <span
                            class="musthave">*</span>
                    </div>
                    <div class="switchcontainer">
                        <label class="switch" @click="followOfficialAccount()">
                            <input type="checkbox" checked v-model="isSwitched">
                            <span class="slider round"></span>
                        </label><span v-if="isSwitched === false">Bấm để theo dõi OA</span><span
                            v-if="isSwitched === true">Đã theo dõi OA</span>
                    </div>
                    <button class="btnsummit" v-if="isSwitched === true" @click="loginUser">Đăng ký ngay</button>
                    <button class="btncannotsummit" v-if="isSwitched === false" @click="notFollowOa">Đăng ký
                        ngay</button>
                </div>
                <div v-else>
                    <button class="btnsummit" @click="loginUser">Đăng ký ngay</button>
                </div>
            </div>
        </div>
        <section>
            <b-modal v-model="isrepestUserModal" width='80%' scroll="keep" >
                <div class="card">
                    <div class="card-content">
                        <div class="containerPopupLogin">
                            <img class="imgpopopuplogin" src="../assets/referral-bg.png" alt="">
                            <div class="containerTitleLogin">
                                Để bạn có thể nhận quà Guta Cafe cần một số thông tin của bạn để xác thực thông
                                tin đăng ký.
                            </div>
                            <button class="btnlogin" @click="getauthen">Đã hiểu</button>
                        </div>
                    </div>
                </div>
            </b-modal>
        </section>
    </div>
</template>

<script>
const key = import.meta.env.SECRET_KEY
const API_URL = import.meta.env.VITE_APP_API_URL
import axios from 'axios';
import { followOA, getUserInfo, getAccessToken, getPhoneNumber, authorize, openChat } from "zmp-sdk/apis";
import RequestUserInfo from '../popup/RequestUserInfo.vue';

export default {
    components: {
        RequestUserInfo
    },
    data() {
        return {
            isSwitched: false,
            isSwitchedCustom: "Bấm để theo dõi",
            carousels: [],
            userName: '',
            phoneNumber: '',
            userInfo: [],
            phoneToken: '',
            userAccessToken: '',
            avatar: '',
            followedOA: false,
            islogin: false,
            followStatus: 'Đang kiểm tra...',
            isrepestUserModal: false,
            userid: ''
        }
    },
    mounted() {
        this.getPannerList()
        // this.fetchUserInfo()
        this.checkIsLogin()
    },
    methods: {
        async openChatScreen() {
            try {
                await openChat({
                    type: "oa",
                    id: "4079940346853184898",
                    message: "Xin Chào",
                });
            } catch (error) {
                // xử lý khi gọi api thất bại
                console.log(error);
            }
        },
        checkIsLogin() {
            let userdata = localStorage.getItem('user')
            if (userdata.length - 2 === 0) {
                this.islogin = false
            } else {
                this.islogin = true
                this.fetchUserInfo()
            }
        },
        openmodleauthen() {
            this.isrepestUserModal = true
        },
        goToHome() {
            this.$router.push('/')
        },
        async getuserToken() {
            try {
                const accessToken = await getAccessToken({});
                this.userAccessToken = accessToken
                this.getphonenumber()
            } catch (error) {
                console.log(error);
            }
        },
        async getphone() {
            await getPhoneNumber({
                success: async (data) => {
                    this.phoneToken = data.token;
                    this.getuserToken()
                },
                fail: (error) => {
                    console.log(error);
                }
            });
        },
        async getphonenumber() {
            if (this.userAccessToken !== null && this.phoneToken !== null) {
                let userPhoneNumber = await axios.get('https://graph.zalo.me/v2.0/me/info', {
                    headers: {
                        access_token: this.userAccessToken,
                        code: this.phoneToken,
                        secret_key: 'efaxSTwfCHOVfK8HgO53'
                    }
                })
                if (userPhoneNumber.status === 200) {
                    this.phoneNumber = userPhoneNumber.data.data.number
                }
            }
        },
        async getauthen() {
            await authorize({
                scopes: ["scope.userPhonenumber"],
                success: (data) => {
                    this.isrepestUserModal = false
                    this.fetchUserInfo()
                    this.getphone()
                },
                fail: (error) => {
                    console.log(error);
                },
            });
        },
        async fetchUserInfo() {
            await getUserInfo({
                success: (data) => {
                    this.userInfo = data.userInfo;
                    if (this.userInfo.name !== null) {
                        this.userName = this.userInfo.name
                        this.avatar = this.userInfo.avatar
                        this.followedOA = this.userInfo.followedOA
                        this.userid = this.userInfo.id
                        console.log(this.userInfo);
                        let userdata = localStorage.getItem('user')
                        if (userdata.length - 2 === 0) {
                            this.islogin = false
                        } else {
                            this.islogin = true
                        }
                        localStorage.setItem('avatar', JSON.stringify(data.userInfo.avatar))
                    }
                },
                fail: (error) => {
                    console.error('Lỗi khi lấy thông tin người dùng:', error);
                },
            });
        },
        async followOfficialAccount() {
            try {
                await followOA({
                    id: '4079940346853184898'
                });
                this.isSwitched = true
            } catch (error) {
                if (error.code === -201) {
                    this.isSwitched = false
                }
                console.log(error);
            }
        },
        async getPannerList() {
            let pannerData = await axios.get('https://lab-gapi.guta.asia/v2/promotions', {
                params: {
                    position: 'home',
                    location: 1
                }
            });
            if (pannerData.status === 200) {
                this.carousels = pannerData.data.campaigns.items
            }

        },
        async loginUser() {
            if (this.userName === null | this.userName === '') {
                console.log('vui long nhap ten');
            } else if (this.phoneNumber === null | this.phoneNumber === '') {
                console.log('vui long nhap so dien thoai');
            } else {
                let userData = await axios.post(`${API_URL}/api/auth/login`, {
                    name: this.userName,
                    phone: this.phoneNumber,
                    zlid:  this.userid
                });
                if (userData.status === 200) {
                    this.dataUser = userData.data
                    console.log(this.dataUser);
                    
                    localStorage.setItem('user', JSON.stringify([this.dataUser]))
                    this.$router.push('/')
                }
            }
        },
        notFollowOa() {
            this.$buefy.notification.open({
                duration: 2500,
                message: `Hãy theo dõi OA để có thể đăng ký nhé!`,
                type: 'is-danger',
                position: 'is-top',
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.Popup {
    top: 0;
    height: 100vh;
    width: 100vw;
    background-color: white;
    box-sizing: border-box;
    margin-top: 50px;

    .headerPopup {
        height: 40px;
        align-content: center;
        padding-left: 10px;
        font-size: 16px;
        font-weight: 600;
        background-color: white;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }

    .musthave {
        color: red;
    }

    .containerform {

        padding: 10px;
        width: 100%;

        .forminput {
            width: 100%;
            margin-bottom: 20px;
        }
    }

    .title {
        font-size: 14px;
        margin-bottom: 10px;
        color: gray;
    }

    .iconForm {
        width: 14px;
        height: 14px;
        color: gray;
    }

    .inputcontainer {
        width: 100%;
        height: 40px;
        border: 1px solid rgba(128, 128, 128, 0.423);
        border-radius: 5px;
        background-color: white;
        overflow: hidden;
    }

    .inputvalue {
        height: 100%;
        width: 100%;
        border: none;
        font-size: 14px;
        padding-left: 10px;
        font-weight: 500;
        outline: none
    }

    .valuefooter {
        font-size: 14px;
        font-weight: 500;
    }

    // .switchbtn {
    //     margin-top: 10px;
    //     font-size: 14px;
    //     font-weight: 500;
    // }

    .btnsummit {
        width: 100%;
        height: 40px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 5px;
        border: none;
        background-color: #215AA8;
        color: white;
        margin-top: 20px;
    }

    .btncannotsummit {
        width: 100%;
        height: 40px;
        font-size: 14px;
        font-weight: 500;
        border-radius: 5px;
        border: none;
        background-color: #9d9c9c;
        color: white;
        margin-top: 20px;
    }
}

.switchcontainer {
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: 500;
}

.switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 24px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
}

input:checked+.slider {
    background-color: #215AA8;
}

input:focus+.slider {
    box-shadow: 0 0 1px #215AA8;
}

input:checked+.slider:before {
    -webkit-transform: translateX(20px);
    -ms-transform: translateX(20px);
    transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}

.imgslider {
    width: 100%;
    height: 100%;
}

.titleheaderform {
    font-size: 14px;
    font-weight: 500;
    padding: 10px;

    .logoiconandroid {
        width: 20px;
    }
}

.containerdatauser {
    height: 100vh;
    text-align: center;

    .backgroundHeader {
        width: 100%;
        height: 80px;
        background-color: #013787;
    }


    .containermess {
        display: flex;
        padding: 10px;
        font-size: 14px;

        .containerTitle {
            align-content: center;
        }

        .logoiconandroid {
            width: 20px;
        }

        .imgconrat {
            width: 60%;
        }
    }

    .usernameLogin {
        display: flex;
        text-align: left;
        font-size: 16px;
        font-weight: 500;
        margin-left: 10px;
        align-items: center;
        width: 80%;

        .usernameLogindetail {
            width: 100%;
        }

        .phoneuserlogin {
            font-weight: 400;
            font-size: 12px;
            color: #9d9c9c;
        }

        .imggift {
            width: 20px;
            height: 20px;
        }
    }

    .chatcontainer {
        width: 100%;
        padding: 10px;
        height: 80px;

        .chatinfo {
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: #215AA8;
            border-radius: 5px;
            padding: 10px;

            .imgbtnoa {
                width: 20%;
            }

            .titlebtnoa {
                width: 40%;
                color: #fff;
                font-size: 12px;
                font-weight: 600;
                padding-left: 10px;
                padding-right: 5px;
                text-align: left;
            }

            .btnchatbox {
                width: 40%;
                background-color: rgb(248, 116, 0);
                border: 2px solid orange;
                border-radius: 5px;
                color: #fff;
                font-size: 12px;
                font-weight: 600;
                padding: 5px;
            }
        }
    }

    .receive-btn {
        max-width: 600px;
        width: 90%;
        padding: 14px 0;
        border: none;
        border-radius: 15px;
        margin: auto;
        color: #fff;
        font-weight: 600;
        font-size: 18px;
        animation: btnAnimation 1.3s infinite;
        cursor: pointer;
    }

    .pushable {
        background-color: #013787;
        border-radius: 10px;
        border: none;
        padding: 0;
        cursor: pointer;
        outline-offset: 4px;
        width: 100%;
    }

    .pushable:focus:not(:focus-visible) {
        outline: none;
    }

    .front {
        display: block;
        padding: 12px 35px;
        border-radius: 10px;
        font-size: 16px;
        background-color: #034ab3;
        color: white;
        transform: translateY(-6px);
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }

    .pushable:active .front {
        transform: translateY(-2px);
    }

    .detailUserInfo {
        display: flex;
        padding: 10px;
        align-items: center;
        border-radius: 5px;
        box-shadow: rgba(112, 112, 115, 0.2) 0px 7px 29px 0px;

        .containerAvatar {
            display: flex;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            overflow: hidden;
            align-items: center;
        }
    }

    .avatarUser {
        width: 50px;
        height: 50px;
    }
}
</style>