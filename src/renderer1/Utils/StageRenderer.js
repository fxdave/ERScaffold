import TempLayer from './TempLayer'
import Arranger from './Arranger/Arranger'
import Konva from '../Vendor/Konva'
class StageRenderer {
    static render(stage) {
        const S =  new stage()

        let anim = new Konva.Animation(() => {
            Arranger.tick()
        })

        for(let i in S.layers) {
            S.add(S.layers[i])    
            anim.addLayer(S.layers[i])
        }

        S.add(TempLayer)

        anim.start()


        window.addEventListener('resize', () => {
            S.width(window.innerWidth)
            S.height(window.innerHeight)
        })

        document.querySelectorAll('canvas').forEach(v => {
            v.onmousedown = () => {
                return false
            }
        })

        return S
    }
}

export default StageRenderer