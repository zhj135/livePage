<template>
  <div class="container">
    <canvas id="masterVideo" class="canvasVideo" :hidden="!isMaster" ref="masterVideo"></canvas>
    <img src="static/streamExchange.png" class="img-exchange" @click="handleChangeStream">
    <canvas id="slaveVideo" class="canvasVideo" :hidden="isMaster" ref="slaveVideo"></canvas>
  </div>
</template>
<script>

export default {
  name: 'LivePage',
  data() {
    return {
      url: 'rtmp://live.hkstv.hk.lxdns.com/live/hks',
      isMaster: true,
      streamMaster: 'ezviz://ezopen.rtmp?hd=ezopen%3A%2F%2Fopen.ys7.com%2F140816632%2F1.hd.live&normal=ezopen%3A%2F%2Fopen.ys7.com%2F140816632%2F1.live&ezviz=140816632&ezviz_channel=1',
      streamSlave: 'ezviz://ezopen.rtmp?hd=ezopen%3A%2F%2Fopen.ys7.com%2F140816411%2F1.hd.live&normal=ezopen%3A%2F%2Fopen.ys7.com%2F140816411%2F1.live&ezviz=140816411&ezviz_channel=1',
    };
  },
  methods: {
    getStream(url) {
      return `wss://ys-wss.zywawa.com/${/&ezviz=(\d+)&/i.exec(url)[1]}_1_1`
    },
    renderWssStream(wssStream, element) {
      /* eslint-disable */
      new JSMpeg.Player(wssStream, { canvas: element, audio:false, autoplay: true, videoBufferSize: 200*1024 })
    },
    handleChangeStream() {
      let { isMaster, streamMaster, streamSlave } = this;
      const stream = isMaster ? streamMaster : streamSlave;
      const element = isMaster ? this.$refs.masterVideo : this.$refs.slaveVideo;
      const wssStream = this.getStream(stream);
      this.renderWssStream(wssStream, element);
      this.isMaster = !isMaster
    }
  },
  mounted() {
    const wssMasterStream = this.getStream(this.streamMaster);
    const wssSlaveStream = this.getStream(this.streamSlave);
    this.renderWssStream(wssMasterStream, this.$refs.masterVideo);
    this.renderWssStream(wssSlaveStream, this.$refs.slaveVideo);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  position: relative;
  height: 500px;
}
.canvasVideo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.img-exchange{
  height: 49px;
  width: 38px;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -25px;
  z-index: 999;
}
</style>
