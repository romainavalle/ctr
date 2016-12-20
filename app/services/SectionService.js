import NavigationService from './NavigationService'
import SignalService from './SignalService'




class SectionService {

  currentSection = ''
  currentId = -1
  section_array = []
  isSectionActivated = false
  isSectionRequired = false

  constructor() {
    this.onNavigationChanged = this.onNavigationChanged.bind(this)
    this.onDeactivateSectionCompleted = this.onDeactivateSectionCompleted.bind(this)
    this.onActivateSectionCompleted = this.onActivateSectionCompleted.bind(this)
    setTimeout(() => { this.init() }, 0)
  }

  init() {
    this.markers = window.app.el.querySelectorAll('.Marker')
    TweenMax.set(this.markers, { opacity: 0 })
    translations.sections.forEach((section, i) => {
      this.section_array.push(document.getElementById(section.id))
    })
    SignalService.NAVIGATION_CHANGED.add(this.onNavigationChanged)
    SignalService.DEACTIVATE_SECTION_COMPLETED.add(this.onDeactivateSectionCompleted)
    SignalService.ACTIVATE_SECTION_COMPLETED.add(this.onActivateSectionCompleted)
    this.onNavigationChanged()
  }

  onActivateSectionCompleted(){
    console.log('onActivateSectionCompleted')
    this.isSectionActivated = true
    this.deactivateSection()
  }

  onNavigationChanged() {
    this.isSectionRequired = true
    this.deactivateSection()
  }

  deactivateSection(){
    if(!this.isSectionActivated)return
    if(!this.isSectionRequired)return
    if (this.currentSection != NavigationService.hash) {
      if (this.currentId !== -1) {
        let direction = (this.currentId < NavigationService.currentId) ? -1 : 1
        window.app.sections[this.currentId].deactivate(direction)
      }
    }
  }

  onDeactivateSectionCompleted() {
    this.isSectionActivated  = false
    this.isSectionRequired  = false
    let direction = (this.currentId < NavigationService.currentId) ? -1 : 1
    this.currentSection = NavigationService.hash
    this.currentId = NavigationService.currentId
    if (window.app.manager3d) window.app.manager3d.updateParticules(this.currentId)
    window.app.sections[this.currentId].activate(direction)
    if(this.currentId){
      TweenMax.to(this.markers, 1, { opacity: .1, ease: Quad.easeOut })
    }else{
      TweenMax.to(this.markers, 1, { opacity: 0, ease: Quad.easeIn })
    }
  }
}

export default new SectionService();
