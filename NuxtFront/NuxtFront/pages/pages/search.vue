<template>
   <section class="container">
      <b-container fluid>
         <b-row class="" sm="12" >
            <b-form sm="12" @submit.prevent="get">
      <b-form-group  id="SkipGroup"
                    label="Skip:"
                    description="nombre de crime minimum à afficher">
                  <b-form-input id="Skip"
                     type="number"
                     required>
                  </b-form-input>
      </b-form-group>
      <b-form-group  id="LimitGroup"
                    label="Limit:"
                    description="nombre de crime maximum à afficher">
                  <b-form-input id="Limit"
                     type="number"
                     required>
                  </b-form-input>
      </b-form-group>
<input id="dateDebut" type="datetime-local" name="dateDebut" class="form-control">
<input id="dateFin" type="datetime-local" name="dateFin" class="form-control">
    <b-form-select v-model="selected" :options="weaponType" class="mb-3">
    </b-form-select>
    <b-form-select v-model="selected2" :options="incident_type_description" class="mb-3">
    </b-form-select>
               <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
         </b-row>
      </b-container>
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
      <b-table responsive striped hover :items="list"></b-table>
   </section>
</template>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script>
  import * as VueGoogleMaps from '~/node_modules/vue2-google-maps/src/main'
  import Vue from 'vue'
  import axios from 'axios'

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
        }],
        list: [],
        selected: null,
        selected2: null,
        weaponType: [],
        incident_type_description: []
      }
    },
    async created () {
      const res = await axios('http://localhost:1337/api/incident_type_description')
      var list2 = res.data
      for (var type = 0; type < list2.length; type++) {
        this.incident_type_description.push(JSON.parse('{"value": "' + list2[type] + '", "text": "' + list2[type] + '"}'))
      }
      const res2 = await axios('http://localhost:1337/api/typearme')
      list2 = res2.data
      for (type = 0; type < list2.length; type++) {
        this.weaponType.push(JSON.parse('{"value": "' + list2[type] + '", "text": "' + list2[type] + '"}'))
      }
    },
    async fetch ({
      store
    }) {
      // const res = await axios('http://localhost:1337/api/crime/152038705')
      // console.log(res.data)
      // store.commit('initial', res.data)
    },
    computed: {
    },
    methods: {
      async get (data) {
        console.log('test')
        const res = await axios('http://localhost:1337/api/crimes?Skip=' + data.target[1].value + '&Limit=' + data.target[3].value + '&dateDebut=' + data.target[4].value + '&dateFin=' + data.target[5].value + '&weapontype=' + data.target[6].value + '&incident_type_description=' + data.target[7].value)
        var list2 = res.data
        this.list = list2
        console.log(list2 + 'test')
        for (var crime = 0; crime < list2.length; crime++) {
          list2[crime].VOIR = '<a href="/pages/item/' + list2[crime]._id + '">VOIR</a>'
          var location = list2[crime].location
          location = location.replace('(', '[')
          location = location.replace(')', ']')
          location = JSON.parse(location)
          // console.log(crime)
          this.center.lat = parseFloat(location[0])
          this.center.lng = parseFloat(location[1])
          var locationFinal = {}
          locationFinal.position = {}
          locationFinal.position.lat = parseFloat(location[0])
          locationFinal.position.lng = parseFloat(location[1])
          this.markers.push(locationFinal)
        }
      }
    }
  }
</script>