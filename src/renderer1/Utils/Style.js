import Konva from '../Vendor/Konva'

class Style {
    constructor(props) {
        this.NotBuiltIns = ['hover', 'duration', 'easing', 'cursor', 'click', 'children']
        this.props = props
        this.saves = []
        this.easing = [
            { name: 'Linear', color: 'blue' },
            { name: 'EaseIn', color: 'green' },
            { name: 'EaseOut', color: 'green' },
            { name: 'EaseInOut', color: 'green' },
            { name: 'BackEaseIn', color: 'blue' },
            { name: 'BackEaseOut', color: 'blue' },
            { name: 'BackEaseInOut', color: 'blue' },
            { name: 'ElasticEaseIn', color: 'green' },
            { name: 'ElasticEaseOut', color: 'green' },
            { name: 'ElasticEaseInOut', color: 'green' },
            { name: 'BounceEaseIn', color: 'blue' },
            { name: 'BounceEaseOut', color: 'blue' },
            { name: 'BounceEaseInOut', color: 'blue' },
            { name: 'StrongEaseIn', color: 'green' },
            { name: 'StrongEaseOut', color: 'green' },
            { name: 'StrongEaseInOut', color: 'green' }
        ]
    }

    apply(el) {

        let element = el.shape
        if (!element) {
            console.error('Style: shape is required for applying style')
            return
        }

        let layer = element.getLayer()
        if (!layer) {
            console.error('Style: layer is required for applying style')
            return
        }

        this.preFilterProps()
        

        for (let id in this.props) {
            if (this.isBuiltIn(id)) {
                element[id](this.props[id])
            }
            element.dispatchEvent(new Event('updated:width'))
            element.dispatchEvent(new Event('updated:position'))
        }


        
        layer.draw()

        if (this.props.children) {
            this.setStyleForChildren(this.props.children, element.props.children)
        }

        if (this.props.hover) {
            let props = this.props.hover
            this.setEvent(element, element, 'mouseover', 'mouseleave', props)

            if (props.children) {
                for (let index in props.children) {
                    let hoverPropsForChild = props.children[index].props
                    this.setEvent(element, element.props.children[index].shape, 'mouseover', 'mouseleave', hoverPropsForChild)
                }
            }
        }
        if (this.props.click) {
            this.setEvent(element, element, 'mousedown', 'mouseup', this.props.click)
        }
    }

    preFilterProps(){
        if (this.props.zIndex !== undefined ) {
            this.props.setZIndex = this.props.zIndex
            delete this.props['zIndex']
        }
    }

    setStyleForChildren(children, element) {

        for (let index in children) {

            children[index].apply(element[index])
        }
    }


    setEvent(elementForEvent, elementToTween, startEventName, endEventName, props) {
        if(!elementToTween){
            console.error('Style: shape is required for applying style')
            return
        }
        const Time = this.props.duration ? this.props.duration : 0
        const Easing = this.props.easing ? Konva.Easings[this.props.easing] : Konva.Easings.Linear


        let finish = () => {
            tween.reverse()
        
            if (props.cursor) {
                document.body.style.cursor = 'inherit'
            }
        }

        let tweenProps = {
            node: elementToTween,
            ...props,
            easing: Easing,
            duration: Time
        }
        

        if (startEventName == endEventName) {
            tweenProps.onFinish = finish
        } else {
            elementForEvent.on(endEventName, () => {
                finish()
            })
        }

        var tween = new Konva.Tween(tweenProps)
        window.tween = tween
        
        elementForEvent.on(startEventName, () => {
            tween.play()
            if (props.cursor) {
                document.body.style.cursor = props.cursor
            }
        })
    }

    isBuiltIn(id) {
        return this.NotBuiltIns.includes(id) != true
    }

}



export default Style