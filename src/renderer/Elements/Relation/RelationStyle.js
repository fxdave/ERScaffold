
import Style from '../../Utils/Style'

export default new Style.Class({
    children: {
        bg: new Style.Class({
            radius: 10,
            stroke: 'black',
            strokeWidth: 1,
            fill:'#fff'
        }),
        text: new Style.Class({
            zIndex:9,
            fontSize:10,
            fill: '#000',
            fontFamily: 'Open Sans'
        })
    }
})