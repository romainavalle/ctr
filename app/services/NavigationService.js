import SignalService from './SignalService'
import ScrollService from './ScrollService'

class NavigationService {

  hash = ''
  lang = ''
  currentId = 0

  constructor() {
    this.onMouseScroll = this.onMouseScroll.bind(this)
    this.init()
  }

  init() {
    this.parseLocation()
    SignalService.MOUSE_WHEEL.add(this.onMouseScroll)
  }

  parseLocation() {
    let location_array = document.location.pathname.split('/')
    this.lang = location_array[1]
    if (location_array.length < 3 || location_array[2] === '') {
      this.hash = translations.sections[0].id
      window.history.pushState(null, null, document.location.pathname + this.hash);
    } else {
      let temp_hash = ''
      translations.sections.forEach((section, i) => {
        if (section.id === location_array[2]) {
          temp_hash = section.id
          this.currentId = i
        }
      })
      if (temp_hash) {
        this.hash = temp_hash
      } else {
        this.hash = translations.sections[0].id
      }
    }
    console.info('section - > ' + this.hash)
  }

  nextSection() {
    this.changeLocation(translations.sections[this.currentId + 1].id)
  }

  changeLocation(sectionId) {
    if (sectionId === translations.sections[this.currentId].id) return
    window.history.pushState(null, null, sectionId);
    this.parseLocation()
    SignalService.NAVIGATION_CHANGED.dispatch()

  }

  onMouseScroll(delta) {
    let id = delta > 0 ? Math.min(this.currentId + 1, translations.sections.length - 1) : Math.max(this.currentId - 1, 0)
    this.changeLocation(translations.sections[id].id)
  }
}

export default new NavigationService();
