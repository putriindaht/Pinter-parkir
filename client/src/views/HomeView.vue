<script>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LPopup, LControl } from "@vue-leaflet/vue-leaflet";
import { mapActions, mapState } from "pinia";
import { useLocationStore } from '../stores/location'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LControl
  },
  data() {
    return {
      isLoaded: false,
      zoom: 15,
      center: [-6, 106]
    };
  },
  methods: {
    ...mapActions(useLocationStore, ['fetchLocations'])
  },
  computed: {
    ...mapState(useLocationStore, ['locations'])
  },
  async created() {
    try {
      await this.fetchLocations()
      this.isLoaded = true
      if (this.locations) {
        let sumLong = 0
        let sumLat = 0
        this.locations.forEach(el => {
          sumLong += el.coordinate.coordinates[0]
          sumLat += el.coordinate.coordinates[1]
        })
        const avgLong = sumLong / this.locations.length
        const avgLat = sumLat / this.locations.length
        this.center = [avgLong, avgLat]
        this.isLoaded = true
      }
    } catch (error) {
      console.log(error)
    }
  },
};
</script>

<template>
  <div class="map my-20" v-if="isLoaded">
    <l-map :useGlobalLeaflet="false" ref="map" :zoom="zoom" :center="center">
      <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap">
      </l-tile-layer>
      <l-control class="leaflet-control leaflet-control" position="bottomleft">Hi, this is our smart
        places!</l-control>
      <div v-for="location in locations" :key="location">
        <l-marker :lat-lng="[...location.coordinate.coordinates]">
          <l-popup>{{ location.name }}</l-popup>
        </l-marker>
      </div>
    </l-map>
  </div>
</template>

<style scoped>
.map {
  margin-top: 50px;
  height: calc(100vh - 48px);
  width: 100%;
  display: flex;
  justify-content: center;
}

.leaflet-control {
  background: white;
  border: 1px solid steelblue;
  border-radius: 0.6em;
  padding: 1em;
  font-size: large;
  font-style: italic;
}
</style>