import courses from '../mockData/data'

export const state = () => ({
  courses: [],
  course: {}
})


export const mutations = {
  SET_COURSES: (state, payload) => {state.courses = payload},
  ADD_COURSE: (state, payload) => state.courses.push(payload),
  GET_COURSE: (state, payload) => state.course = payload
}


export const actions = {
  getCourses({commit}) {
     commit('SET_COURSES',courses)
  },

  deleteCourses({commit}, id) {
    // if (process.client) {
    //   const data = localStorage.getItem('courses')
    //   localStorage.setItem('courses', JSON.stringify(JSON.parse(data).state.courses.filter(i => i.id !== id)))
    // }
  },

  addCourses({commit}, body) {
    commit('ADD_COURSE', body)
  },

  getCourse({commit}, id) {
    const data = courses.find(i => i.id === id)
    commit('GET_COURSE', data)
  }
}
