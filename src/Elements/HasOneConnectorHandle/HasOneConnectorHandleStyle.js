import Style from '../../Utils/Style'

export default new Style.Class({
    children: {
        line: new Style.Class({
            stroke: '#ff006f',
            strokeWidth: 4,
            opacity: 0.5,
            hover: {
                opacity: 1
            },
            draggable: true,
        })
    }
})