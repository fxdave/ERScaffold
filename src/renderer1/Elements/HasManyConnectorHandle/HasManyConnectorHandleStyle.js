import Style from '../../Utils/Style'

export default new Style.Class({
    children: {
        triangle: new Style.Class({
            fill: '#ff006f',
            closed:true,
            opacity: 0.5,
            hover: {
                opacity: 1
            },
            draggable: true,
        })
    }
})