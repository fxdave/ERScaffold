class ElementRenderer {
    static render(element) {
        const elem = new element()
        console.log(elem);
        
        elem.layer.add(elem.shape)
        console.log("elem rendered");
        
        return elem
    }
}

export default ElementRenderer