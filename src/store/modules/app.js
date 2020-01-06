import Cookies from 'js-cookie'

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    mainPage: true,
    search: {},
    theme: 'default',
    badge: {'授权': undefined},
    livenewsChannels: Cookies.get('livenewsChannels') || '[]',
    visitedViews: []
  },
  mutations: {
    SET_SEARCHPARAM: (state, searchParam) => {
      if (searchParam.pageId) {
        state.search[searchParam.pageId] = searchParam
      }
    },
    SET_BADGE: (state, param) => {
      let {key, count} = param
      if (key) {
        if (count > 0) {
          if (state.badge[key] !== count) {
            state.badge[key] = count
          }
        } else {
          state.badge[key] = undefined
        }
      }
    },
    SHOW_MAIN: state => {
      state.mainPage = true
      // console.log(state.mainPage)
    },
    SHOW_DETAIL: state => {
      state.mainPage = false
      // console.log(state.mainPage)
    },
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({ name: view.name, path: view.path })
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    addVisitedViews: ({ commit }, view) => {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews: ({ commit }, view) => {
      commit('DEL_VISITED_VIEWS', view)
    }
  }
}

export default app
