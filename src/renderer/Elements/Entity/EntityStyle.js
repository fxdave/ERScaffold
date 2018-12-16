import Style from '../../Utils/Style'

export default new Style.Class({
    duration: 0.2,
    children: {
        propertyAddButton: new Style.Class({
            y: -40,
            zIndex:0,
            duration:0.2,
            opacity: 0.5,
            hover: {
                opacity: 1
            }
        }),
        propertyAddLine: new Style.Class({
            points:[0,0,0,-40],
            zIndex:0,
            stroke: '#00cc00',
            strokeWidth:1,
        }),
        bg : new Style.Class({
            width: 50,
            zIndex:1,
            height: 50,
            cornerRadius: 10,
            fill: '#2f2f2f'
        }),
        text: new Style.Class({
            zIndex:9,
            fontSize:22,
            fill: '#fff',
            fontFamily: 'Open Sans'
        }),
        deleteButton: new Style.Class({
            zIndex:2
        }),
        hasManyConnectorHandle: new Style.Class({
            zIndex:0,
            rotation : 22.5
        }),
        hasOneConnectorHandle: new Style.Class({
            zIndex:0,
            rotation : 67.5
        })
    }
})