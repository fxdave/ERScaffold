import TempLayer from './TempLayer'

class StageRenderer {
    static render(stage) {
        const S =  new stage()
        
        for(let i in S.layers) {
            S.add(S.layers[i])    
        }

        S.add(TempLayer)


        document.querySelectorAll('canvas').forEach(v => {
            v.onmousedown = e => {
                return false
            }
        })

        return S
    }
}

export default StageRenderer