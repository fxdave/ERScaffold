import Style from '../../Utils/Style'

let lineStyle = new Style.Class({
    stroke: 'black',
    strokeWidth: 2,
})

export default new Style.Class({
    children: {
        line1: lineStyle,
        line2: lineStyle,
        line3: lineStyle
    }
})