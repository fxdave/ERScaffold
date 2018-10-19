import Style from '../../Utils/Style'

export default new Style.Class({
    zIndex:0,
    duration: 0.2,
    children: {
        circle: new Style.Class({
            radius: {
                x: 30,
                y: 20
            },
            fill: '#fff',
            stroke: 'black',
            strokeWidth: 1
        }),
        text: new Style.Class({
            x: -3,
            y: -6,
            fontSize: 14,
            fill: '#000'
        }),
        deleteButton: new Style.Class({
            opacity: 0
        }),
        line: new Style.Class({
            points: [0, 0, 0, 0],
            stroke: 'black',
            strokeWidth: 1,
        })
    },
    hover: {
        children: {
            deleteButton: new Style.Class({
                opacity :1
            })
        }
    }
})