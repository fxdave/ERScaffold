class StageRenderer {
    static render(stage) {
        const S =  new stage()
        
        for(let i in S.layers) {
            S.add(S.layers[i])    
        }

        return S
    }
}

export default StageRenderer