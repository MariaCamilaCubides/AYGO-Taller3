<template>
  <card
      external-card="material-card-content"
      internal-card="material-card material-card-content"
    >
      <div
        slot="external-header"
      >    
        <b-clockpicker
          v-model="time"
          icon="clock"
          :hour-format="'12'">
        </b-clockpicker>
        <b-carousel :indicator-inside="false">
          <b-carousel-item v-for="(item, i) in 6" :key="i">
              <b-image class="image" :src="getImgUrl(i)"></b-image>
          </b-carousel-item>
          <template #indicators="props">
              <b-image class="al image" :src="getImgUrl(props.i)" :title="props.i"></b-image>
          </template>
         </b-carousel>
      </div>
    </card>
</template>

<script>
export default {
  name: 'GalleryCarousel',
  data() {
    return {
      time: new Date(),
    };
  },
  created() {
    setInterval(() => {this.time = new Date()}, 1000);
  },
  methods: {
      getImgUrl(value) {
          return `https://picsum.photos/id/43${value}/1230/500`
      }
  }
}
</script>

<style scoped>

.button {
  margin: 0px 2px;
}
</style>
