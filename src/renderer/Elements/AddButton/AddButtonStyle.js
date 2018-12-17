import Style from '../../Utils/Style'

export default new Style.Class({
    children: {
        bg: new Style.Class({
            x : 0,
            y :  0,
            radius: 10,
            fill: '#00cc00',
        }),
        text : new Style.Class({
            x: -4,
            y: -7,
            fontSize:14,
            text : '+',
            fill: '#fff'
        })
    }
})