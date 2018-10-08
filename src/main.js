import Viewport from './Viewport/Viewport'
import ArrangerAnimation from './Viewport/ArrangerAnimation'
import './resources/css/OpenSans.scss'
import './resources/css/Panel.scss'
import './resources/css/Global.scss'
import '../index.html'
const ERV = new Viewport()
const arrangerAnimation = new ArrangerAnimation([
    ERV.entityLayer,
    //ERV.connectionEntityLayer,
    ERV.connectionLayer
], ERV.arranger)

arrangerAnimation.start()
