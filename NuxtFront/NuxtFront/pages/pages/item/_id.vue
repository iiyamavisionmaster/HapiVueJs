<template>
   <section class="container">
      <b-form @submit.prevent="updateCrime"  >
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="compnos">
         </b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="naturecode">
         </b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="incident_type_description"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="main_crimecode"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="reptdistrict"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="reportingarea"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="fromdate"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="weapontype"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="shooting"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="domestic"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="shift"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="year"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="month"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="day_week"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="ucrpart"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="x"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="y"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="streetname"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="xstreetname"></b-form-input>
         <b-form-input id="exampleInput1"
            type="text"
            required
            :value="location"></b-form-input>
         <b-button type="submit" variant="primary">Submit</b-button>
      </b-form>
      <gmap-map
         :center="center"
         :zoom="7"
         style="width: 500px; height: 300px"
         >
         <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
            ></gmap-marker>
      </gmap-map>
      <!-- 
         <b-table responsive striped hover :items="list"></b-table> -->
   </section>
</template>
<script>
  import {
    mapState, mapActions
  }
    from 'vuex'
  import axios from 'axios'
  import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'
  import Vue from 'vue'

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyCsJbVzd7KCQbxOuXrFFIc8nagvGFvQeo0'
      // libraries: 'places', //// If you need to use place input
    }
  })
  export default {
    data () {
      return {
        center: {lat: 10.0, lng: 10.0},
        markers: [{
          position: {lat: 10.0, lng: 10.0}
        }]
      }
    },
    async created () {
      console.log(this.$route.params.id)
      const res = await axios('http://localhost:1337/api/crime?id=' + this.$route.params.id)
      console.log(res.data)
      this.$store.dispatch('initial', res.data)
      var location = res.data.location
      location = location.replace('(', '[')
      location = location.replace(')', ']')
      location = JSON.parse(location)
      this.markers[0].position.lat = parseFloat(location[0])
      this.markers[0].position.lng = parseFloat(location[1])
      this.center.lat = parseFloat(location[0])
      this.center.lng = parseFloat(location[1])
    },
    computed: {
      ...mapState({
        list: state => state.list
      }),
      compnos () {
        return `${this.list.compnos}`
      },
      naturecode () {
        return `${this.list.naturecode}`
      },
      incident_type_description () {
        return `${this.list.incident_type_description}`
      },
      main_crimecode () {
        return `${this.list.main_crimecode}`
      },
      reptdistrict () {
        return `${this.list.reptdistrict}`
      },
      reportingarea () {
        return `${this.list.reportingarea}`
      },
      fromdate () {
        return `${this.list.fromdate}`
      },
      weapontype () {
        return `${this.list.weapontype}`
      },
      shooting () {
        return `${this.list.shooting}`
      },
      domestic () {
        return `${this.list.domestic}`
      },
      shift () {
        return `${this.list.shift}`
      },
      year () {
        return `${this.list.year}`
      },
      month () {
        return `${this.list.month}`
      },
      day_week () {
        return `${this.list.day_week}`
      },
      ucrpart () {
        return `${this.list.ucrpart}`
      },
      x () {
        return `${this.list.x}`
      },
      y () {
        return `${this.list.y}`
      },
      streetname () {
        return `${this.list.streetname}`
      },
      xstreetname () {
        return `${this.list.xstreetname}`
      },
      location () {
        return `${this.list.location}`
      }
    },
    methods: {
      ...mapActions([
        'updateCrime', 'initial'
      ])
    }
    // asyncData ({ params, error }) {
    //   return { test: params }
    // },
  }
</script>