
import Anchor from './Abstract/Anchor'
import EvenetHelper from '../EventHelper'
class CustomAnchor extends Anchor {
    /**
     * 
     * @param {Element|Element[]} toModify 
     * @param {Element|Element[]} toWatch 
     * @param {string|string[]} events 
     * @param {function} onUpdate 
     */
    constructor(toModify, toWatch, events, onUpdate) {
        super(toModify)
        if(!(toWatch instanceof Array)) 
            toWatch = [toWatch]
            
        EvenetHelper.on(events, toWatch, onUpdate)
    }
}

export default CustomAnchor