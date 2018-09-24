import ERV from './Viewport/ViewportInstance'
import ArrangerAnimation from './Viewport/ArrangerAnimation'


const arrangerAnimation = new ArrangerAnimation([
    ERV.stage.entityLayer,
    ERV.stage.connectionEntityLayer,
    ERV.stage.connectionLayer
], ERV.arranger)

arrangerAnimation.start()
