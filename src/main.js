import Viewport from './Viewport/Viewport'
import ArrangerAnimation from './Viewport/ArrangerAnimation'

const ERV = new Viewport()
const arrangerAnimation = new ArrangerAnimation([
    ERV.entityLayer,
    //ERV.connectionEntityLayer,
    ERV.connectionLayer
], ERV.arranger)

arrangerAnimation.start()
