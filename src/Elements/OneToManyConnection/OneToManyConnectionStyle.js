import Style from '../../Utils/Style'

let lineStyle = new Style.Class({
    stroke: 'black',
    strokeWidth: 2,
})

export default new Style.Class({
    children: {
        one: lineStyle,
        many1: lineStyle,
        many2: lineStyle,
        many3: lineStyle
    }
})