import Style from '../../Utils/Style'

export default new Style.Class({
    children: {
        bg: new Style.Class({
            x : 0,
            y :  0,
            radius: 10,
            fill: '#ff006f',
            opacity: 0.8
        }),
        text : new Style.Class({
            x: -4,
            y: -4,
            fontSize:10,
            text : '\u2715',
            fill: '#fff'
        })
    }
})