
import Style from '../../Utils/Style'
export default new Style.Class({
    children: {
        text: new Style.Class({
            fontSize:14,
            fill: '#000',
            fontFamily: 'Open Sans'
        }),
        bg: new Style.Class({
            fill:'#ebebeb',
        }),
        deleteButton: new Style.Class({
            opacity:0
        })

    },
    hover: {
        children: {
            deleteButton: new Style.Class({
                opacity:1
            })
        }
    }
})