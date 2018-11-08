#Koncepció

Kód generátorok léteznek, és használjuk is őket, hogy gyorsabban elkészüljünk az alkalmazással. A Legtöbb kód generátornak nem lehet sok paramétert átadni, és nem is csinálnak sokat. Legtöbbször egy osztály vagy modul generálására használatosak. 
Relációs adatbázison alapuló weboldalak elkészítését fel lehet gyorsítani egy olyan kód generátorral ami bizonyos kapcsolatoknak a megszokott Model, Controller, View -t és egyben adatbázis sémát is generál. Például a “Bejegyzéseknek van sok kommentjeik” alapján létre tudunk hozni egy bekonfigurált kész oldalt ahol a következő nézetek vannak:

1. Bejegyzések és a hozzá tartozó kommentek
2. Csak bejegyzések
3. Csak kommentek
4. Comment hozzáadása
5. Bejegyzés hozzáadása
6. Bejegyzés és comment párosítása

Olyan kód generátor ami ennyi mindent legenerálna, nem létezik jelenleg. 
Az ilyen állításokat nagyon egyszerű megfogalmazni az Entity Relationship model segítségével. 

#Technológia

A multiplatform érdekében webes felületen készül. Az új javascript verzió régebbi böngészőkhöz a kompatibilitás megörzését a Babel.js könyvtáral érem el. A Babel egy javascript precompiler, ami lehetővé teszi, hogy EcmaScript7 ben (a javascript új verziója) legyen a kód, amíg a kimeneten EcmaScript5 lesz. A designer canvas -el készül, egy saját framework -el, ami használja a Konva.js könyvtárat. A Konva nem nyújt elég funkcionalitást ahhoz, hogy egy nagy project elkészülhessen benne, viszont jelenelg ez a legjobb könyvtár a canvas kezeléséhez. A saját keretrendszerrel elérem azt, hogy a kód átlátható, és később is módosítható maradjon.

##Saját keretrendszer

A keretrendszer a VMMV (View Model ModelView) tervezési mintán alapul, hasonlóan mint az Angular.js.  Egy VMMV hármasnak lehetnek gyerekei, a leveleken lévő elemek már csak a Konva.js beépített formái, így a többi elem ezekből épül fel. Mivel a formázás nagyon sűrűn előfordul a kódban, ezért egy css -hez hasonló implemetációval leegyszerűsítettem a kód ezen részét, és minden elem esetében külön fájlban helyeztem el a stílust. Egy példa egy stílusfájlra:

```javascript
// src/Elements/Property/PropertyStyle.js

import Style from '../../Utils/Style'
export default new Style.Class({
    children: {
        text: new Style.Class({
            fontSize:14,
            fill: '#000',
            fontFamily: 'Open Sans'
        }),
        bg: new Style.Class({
            fill:'#fff',
            stroke: '#000',
            strokeWidth: 1,
        }),
        deleteButton: new Style.Class({
            opacity:0
        })

    },
    hover: {
        children: {
            deleteButton: new Style.Class({
                opacity:1
            })
        }
    }
})
```

A Konva.js rendelkezik egy kezdetleges de használható csoportkezeléssel, de arra sem biztosít objektum orientált megoldásokat. A saját keretrendszerben erre is van egy Forma nevű fájl minden olyan elemnél ahol bonyolult lenne leírni Konva -val a formát. Egy példa forma (shape) fájl:

```javascript

// src/Elements/Property/PropertyShape.js

// imports...

function PropertyShape() {
    const props = {}


    props.draggable = true

    props.children = {
        bg: new EllipseShape,
        text: new EditableText,
        deleteButton: new DeleteButton
    }


    props._arranger_enabled = true
    props._arrangerBoundingType = function(element, to) {
        return BoundingBox(props.children.bg,to)
    }

    props.events = {
        onDelete: new EventRegister(props.children.deleteButton,'click'),
        onChangeText: new EventRegister(props.children.bg, 'dblclick'),
        onChangeText2: new EventRegister(props.children.text, 'dblclick','onChangeText')
    }

    props.anchors = {
        bgWidth: new CustomAnchor(props.children.bg, props.children.text, ['updated:width'], ()=>{
            props.children.bg.shape.radius({
                x: props.children.text.shape.width()/2 + 20,
                y: 20
            })
            props.children.bg.shape.dispatchEvent(new Event('updated:width'))
        }),
        centerText: new CenterAnchor(props.children.text),
        positionAnchor: new PositionAnchor(props.children.bg, props.children.deleteButton, {
            right:0
        },true)
    }

    return new Shape(props)
}

export default PropertyShape

```

`props.children` -ben Látható hogy milyen elemekből épül fel egy újabb elem
`props.events` -ben regisztrálom azt, hogy az elemek mely eseményeire figyeljen a program.
`props.anchors` -ban olyan objektumokat hozok létre ami valamilyen tulajdonság megváltozásakor frissít egy adott elemet. (Pl: szélesebb lett a szöveg, akkor a hátteret is szélesebbre kell állítani.)

A ViewModel fájl az ami a formát, és a stílust összefogja.
```javascript

// src/Elements/Property/Property.js
import Element from '../../Utils/Element'
import PropertyShape from './PropertyShape'
import PropertyStyle from './PropertyStyle'
import PropertyModel from './PropertyModel'

class Property extends Element {
    constructor() {
        super()

        this.style = PropertyStyle
        this.shape = PropertyShape()
        this.model = new PropertyModel(this.shape)
    }

    changeText() {
        this.getShape('text').edit()
        this.model.name = this.getShape('text').shape.text()
    }

    onChangeText(e) {
        e.cancelBubble = true
        this.changeText()
    }

    reconstruct(data) {
        this.getShape('text').setText(data.name)
        this.model.name = data.name
    }

    onDelete() {
        this.shape.dispatchEvent(new Event('delete'))
    }
}

export default Property
```

Minden esemény amit a formában regisztráltam, azok itt vannak lekezelve.
A model az egy egyszerű osztály, rendszerint csak tárol, de az adatokat itt töltöm bele.

### Miért jó ez?
A kód sokkal általánosabb, átláthatóbb. Elkerülöm vele a kód duplikálást. A komponensek nem függenek szorosan össze, így bármikor cserélhetőek, viszont az általános célra egy nagyon kényelmes, átlátható, és gyors megoldást lehet vele biztosítani.


# Jelenlegi fejlesztési módszer
Jelenleg leginkább komponens alapú fejlesztés folyik és jelenleg az egyik leghasználatosabb eszköz a WordPress. A WordPress egy webes tartalomkezelő rendszer, ami alapjáraton blogok készítésére fejlesztettek ki. Sajnos megérkeztek hozzá olyan pluginok, amik webshopok létrehozását teszik lehetővé bennük, és ezt kihasználva, a webfejlesztők is WordPress -el fejlesztenek webshopokat.

## Miért nem jó?
- A komponensek álltalában nem jól dokumentáltak, rendszerint a fejlesztő a stackoverflow-on köt ki ha a legkisebb módosítást is el kell végeznie.
- A fejlesztők nem írhatják át a komponenseket, hanem helyette olyan plugin-t hoznak létre ami majd elvégzi a kívánt módosítást. Ennek eléréséhez úgynevezett hookokat használ a rendszer, amit a komponens készítője tesz bele a fügvények lényegi elemei elé és után, hogy ott lefuthasson egy mások által írt kód. Ezeket a hookokat nem minden plugin fejlesztő teszi bele a kódjába, és ha bele is tenné akkor sem lenne determinisztikus a viselkedése, ugyanis függ a plugin betöltési sorrendjétől a működés (ami beállítására egyébként szintén van egy plugin), valamint nem tudja a webfejlesztő garantálni azt hogy az úgy fog működni ahogy annak kell.
- A wordpress egy blogrendszer, nincs arra felkészítve, hogy más célú weboldal elkészülhessen benne. Ez sajnos azt vonja maga után, hogy mind a kód mind az adatbázis nem követi az üzleti logikát.

## Persze azért vannak előnye is
- Pár perc alatt telepíthető egy webshop, és már használható is

## Konklúzió a jelenlegi fejlesztési módszerről
Habár gyors, nem lehet egyedi igényeket jól kielégíteni vele. Későbbi továbbfejlesztés céljából is rossz választás lehet. Az alkalmazásfejlesztés nagyjából a mások kódjának az értelmezése, és a stackoverflow nézegetéséből ál.

## Mit lehet helyette használni?
A fast prototyping egy olyan fejlesztési forma, ahol viszonylag kevés idő alatt készíthető egy prototípus, aminek az a célja hogy felmérje a felhasználói igényeket. Lényegében itt van nagy szerepe a kód generátoroknak, hogy ez a prototípus minél közelebb legyen az ügyfél által leírt alkalmazáshoz és a lehető legkevesebb idő alatt készüljön el. 

# Cél
A kódgenerátorral megoldható az, hogy egy szép kód gyorsan elkészüljön. Ha vannak kapcsolataink, akkor fel kell ajánlani a lehető legtöbb olyan lehetőséget ami ezekből a kapcsolatokból létrehozható, különben nem lesz gyors a fejlesztés. Egy generálási lehetőség a következő fájlokat fogja legenerálni: 
- Adatbázis migrációs fájlok 
	- (Az adatbázis sémát migrációs fájlokkal lehet verziókezelni, ezért ezek szükségesek ha csapatban kell fejleszteni.)
- Model 
	- (A model felelős az adatok lekérdezésért, módosításáért, törléséért.)
	- A model egy Object Relational Mapping (ORM) rendszerben fog működni annak érdekében hogy ne kelljen SQL lekérdezéseket írni, hanem minél gyorsabban hozzá lehessen férni az adatokhoz.
- Repository 
	- Ez lesz lényegében a klasszikus értelemben vett model réteg. Az lesz a feladata hogy minden adatlekérés biztosítva legyen egy fájlban. És bármikor ha változna az üzleti logika akkor nem kell minden Presenterben átírni a lekérdezést. 
- Presenter
	- Weben nem igazán valósítható meg a Controller, itt nincs nagyon interakció. A presenter feladata, hogy kérésből valami statikus adathalmazt visszaadjon, interakció nélkül.
	- Ez az a réteg ami a kérsét validálja mart visszad egy nézetet
- View
	- Ez felelős az adatok formázott megjelenítésért.
	- Biztosítani kell egy minimális megjelenésű nézetet annak érdekében hogy könnyebben lehessen hozzá fejleszteni egyedi igények szerint, és kell egy normális megjelenés is, ha nem kellenek nagyon egyedi igények akkor azért alapból minél többet tudjon.
	- ide tartoznak a stílusért felelős CSS fájlok, és a View dinamikus megjelenését biztosított javascript fájlok is.

## Kapcsolatok leképzése
Az entity relationship modellből az Adatbáziskezelő rendeszerek 1 tárgyból tanultak alapján leképezhető logikai diagrammá, ami már az adatbázis sémát írja le. Az elsődleges kulcsokat a programból lehet majd kijelölni, de automatikusan az ID nevűt annak fogja nevezni. A külső kulcsok szintén kivehetőek a kapcsolatokból. 
A típusokat a tulajdonságok nevei mellé lehet majd írni.
A táblaneveket egy mesterséges inteligencia fogja többesszámúra alakítani. 