import Style from '../../Utils/Style'

export default new Style.Class({
    duration: 0.2,
    children: {
        propertyAdder: new Style.Class({
            zIndex:0,
            duration:0.2,
            opacity: 0.5,
            hover: {
                opacity: 1
            }
        }),
        text: new Style.Class({
            zIndex:2,
            fontSize:22,
            fill: '#fff',
            fontFamily: 'Open Sans'
        }),
        deleteButton: new Style.Class({
            zIndex:2,
            opacity: 0.1
        }),
        bg : new Style.Class({
            zIndex:1,
            height: 60,
            cornerRadius: 10,
            fill: '#2f2f2f'
        }),
        hasManyRelationHandle: new Style.Class({
            zIndex:0,
            rotation : 22.5
        }),
        hasOneRelationHandle: new Style.Class({
            zIndex:0,
            rotation : 67.5
        })
    },
    hover: {
        children: {
            deleteButton: new Style.Class({
                opacity: 0.9
            })
        }
    }
})