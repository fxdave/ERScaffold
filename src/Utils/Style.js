class Style {}

Style.Class = class {
    constructor(props) {
        this.builtIns = ["hover", "duration", "easing", "cursor", "click"]
        this.props = props
        this.saves = []
        this.easing = [
            {name: 'Linear', color:'blue'},
            {name: 'EaseIn', color:'green'},
            {name: 'EaseOut', color:'green'},
            {name: 'EaseInOut', color:'green'},
            {name: 'BackEaseIn', color:'blue'},
            {name: 'BackEaseOut', color:'blue'},
            {name: 'BackEaseInOut', color:'blue'},
            {name: 'ElasticEaseIn', color:'green'},
            {name: 'ElasticEaseOut', color:'green'},
            {name: 'ElasticEaseInOut', color:'green'},
            {name: 'BounceEaseIn', color:'blue'},
            {name: 'BounceEaseOut', color:'blue'},
            {name: 'BounceEaseInOut', color:'blue'},
            {name: 'StrongEaseIn', color:'green'},
            {name: 'StrongEaseOut', color:'green'},
            {name: 'StrongEaseInOut', color:'green'}
        ]
    }

    apply(element) {

        for(let id in this.props) {
            if(this.isBuiltIn(id))
            element[id](this.props[id])
        }
    
        element.getLayer().draw()
        if(this.props.hover) {
            this.setEvent(element,"mouseover","mouseleave",this.props.hover)
        }
        if(this.props.click) {
            this.setEvent(element,"mousedown","mouseup",this.props.click)
        }
        if(this.props.children) {
            this.setStyleForChildren(this.props.children, element)
        }
    }

    setStyleForChildren(children) {
        for(index in children) {
            children[index].apply(element[index])
        }
    }


    setEvent(element,startEventName,endEventName,props) {
        const T = this.props.duration
        const E = this.props.easing

        
        let finish = () => {
            tween.reverse()

            if(props.cursor) {
                document.body.style.cursor = "inherit"
            }
        }

        let tweenProps = {
            node: element,
            ...props,
            easing: E ? Konva.Easings[E] : Konva.Easings.Linear,
            duration: T ? T : 0
        }

        if(startEventName == endEventName){
            tweenProps.onFinish= finish
        } else {
            element.on(endEventName, e => {
                finish()
            })
        }

        var tween = new Konva.Tween(tweenProps);

        element.on(startEventName, e => {
            tween.play()
            if(props.cursor) {
                document.body.style.cursor = props.cursor
            }
        })
    }

    isBuiltIn(id) {
        return this.builtIns.includes(id) != true
    }

}



