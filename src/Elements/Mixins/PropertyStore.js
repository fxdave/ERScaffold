// problems:
// using global variable: _v
// referencing outside this.add() is not defined by default


const PropertyStore = {
    addProperty() {
        console.log("Add Property")

        const P = new Elements.Property()
        
        //requesting name
        P.text.editText()
        //add to arranger
        _V.arranger.add(P)
        //add to this group
        this.add(P)
        //set z-index
        P.setZIndex(0)

        P.addEventListener("delete", (e)=> {
            this.deleteProperty(P)
        })

    },

    deleteProperty(property) {
        _V.arranger.remove(property)
        property.remove()
    },

    getProperties() {
        return this.children.filter(v => {
            return v instanceof Elements.Property
        })
    }
}