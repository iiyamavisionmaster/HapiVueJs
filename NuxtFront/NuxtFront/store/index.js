import axios from 'axios'

const state = () => ({
  list: []
})

const mutations = {
  initial (state, data) {
    state.list = data
  },
  add (state, data) {
    state.list = [...state.list, data]
  },
  mapsUnique (state, data) {
    state.markers.position.lat = data
  }
}

const actions = {
  async updateCrime ({commit}, submit) {
    const res = await axios.post('http://localhost:1337/api/crime/', {
      compnos: submit.target[0].value,
      naturecode: submit.target[1].value,
      incident_type_description: submit.target[2].value,
      main_crimecode: submit.target[3].value,
      reptdistrict: submit.target[4].value,
      reportingarea: submit.target[5].value,
      fromdate: submit.target[6].value,
      weapontype: submit.target[7].value,
      shooting: submit.target[8].value,
      domestic: submit.target[9].value,
      shift: submit.target[10].value,
      year: submit.target[11].value,
      month: submit.target[12].value,
      day_week: submit.target[13].value,
      ucrpart: submit.target[14].value,
      x: submit.target[15].value,
      y: submit.target[16].value,
      streetname: submit.target[17].value,
      xstreetname: submit.target[18].value,
      location: submit.target[19].value
    })
    console.log(res)
  },
  async initial ({commit}, data) {
    commit('initial', data)
    // commit('add', res.data)
  }
}
export {state, mutations, actions}
