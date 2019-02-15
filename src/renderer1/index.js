import Viewport from './Stages/Viewport/Viewport'
import './resources/css/OpenSans.scss'
import './resources/css/Panel.scss'
import './resources/css/Global.scss'
//import './index.html'
import StageRenderer from './Utils/StageRenderer'
const ERV = StageRenderer.render(Viewport)

window.ERV = ERV