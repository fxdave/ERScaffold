
import Style from '../../Utils/Style'
export default new Style.Class({
    children: {
        line: new Style.Class({
            stroke: 'black',
            strokeWidth: 1,
        }),
        property: new Style.Class({
            y: 100
        })
    }
})