class ElementRenderer {
    static render(element) {
        const elem = new element
        elem.layer.add(elem.shape)
        console.log("elem rendered");
        
        return elem
    }
}

export default ElementRenderer