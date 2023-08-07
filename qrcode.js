Vue.createApp({
    data() {
      return {
        title: "Gerador QRCode",
          text: "",
          qrcode: new QRious({ size: 300 })
      };
    },
    computed: {
        newQRCode() {
          this.qrcode.value = this.text;
          return this.qrcode.toDataURL();
        },
      },
  }).mount('#qrcode');