<template>
     <a :href="appDownloadLink()" target="_blank">
        <div class="bonus-banner">
            <img src="../assets/banner.png" />
        </div>
    </a>
</template>
<script>
import DeviceDetector from "device-detector-js";
export default {
    name: 'AppDownload',
    methods: {
        getDeviceInfo() {
            let deviceDetector = new DeviceDetector();
            let device = deviceDetector.parse(navigator.userAgent);
            return device
        },
        appDownloadLink() {
            let deviceInfo = this.getDeviceInfo()
            let device_type = deviceInfo.device.type
            let link = ''
            if (device_type === 'desktop') {
                link = 'https://gutacafe.com'
            } else {
                link = 'https://guta.asia/appdl'
            }
            return link
        }
    }
}
</script>