# Szakdolgozat

## 1. Motiváció

### 1.1 Jelenlegi fejlesztési problémák

A weboldalak fejlesztése gyakran olyan technológiák felhasználásával jár, ami nem a kívánt célra lett kifejlesztve, ami jelentős hátrányokkal jár, továbbfejlesztés és egyedi igények kielégítése szempontjából.
Ezeket a technológiákat a weboldal jelentős sebességgel való elindításáért használják. Az egyik ilyen eszköz a `Wordpress`.

A `Wordpress` egy web platformon futó tartalomkezelő rendszer, ami blogok készítésére lett kifejlesztve. Ennek ellenére ugyanúgy használatos online áruházak létrehozására is. Számos bővítmény áll rendelkezésünkre, amik segítik, hogy egy projekt gyorsan elindulhasson. A bővítmények általában nem jól dokumentáltak. A dokumentáltság hiánya megnehezíti a követelmények teljesítését.

A fejlesztők nem írhatják át a komponenseket, hanem helyette olyan bővítményeket kell létrehozniuk, amelyek majd elvégzik a kívánt módosítást. Ennek eléréséhez úgynevezett `hook`okat használ a rendszer, ezeket a komponensek készítői tesznek bele a függvények lényeges elemei elé és után, hogy ott lefuthasson egy másik bővítményben, egy mások által írt kód. A `hook`okat nem minden bővítmény készítője teszi bele és biztos, hogy nem minden függvénybe és nagyobb módosítást ezekkel sem lehet jól kivitelezni.

A `wordpress` egy blogrendszer, nem alkalmas arra, hogy más célú weboldalak elkészülhessenek benne. Ez azt vonja maga után, hogy mind a kód mind az adatbázis nem követi az üzleti logikát.

### 1.2 Kód generátorokról általánosságban

A fejlesztést számos módszerrel fel lehet gyorsítani. Ha a programkódban ismétlődés van, akkor annak egy része generálható. Egy magasabb szintű információ magába foglal több alacsonyabb szintű információt. Magasabb szinten, kevesebb idő megfogalmazni információkat, mint alacsony szinten, habár alacsony szinten sokkal specifikusabb információkat adhatunk meg. Így az az ideális, hogyha először magasabb szinten fogalmazzuk meg az igényeinket és azután alacsonyabb szintre generáljuk, majd testre szabjuk alacsony szinten. Ezért szükségesek a kódgenerátorok.

### 1.3 Fejlesztés felgyorsítása, a kód minőség megmaradásával

Relációs adatbázison alapuló weboldalak elkészítését fel lehet gyorsítani egy olyan kód generátorral ami bizonyos kapcsolatoknak a megszokott Model, Controller, View -t és egyben adatbázis sémát is generál. Például a `Egy bejegyzésnek van sok shozzászólása` alapján létre tudunk hozni egy bekonfigurált kész oldalt, ahol a következő nézetek vannak:

1. Bejegyzések és a hozzá tartozó hozzászólások
2. Csak bejegyzések
3. Csak hozzászólások
4. Hozzászólás hozzáadása
5. Bejegyzés hozzáadása
6. Bejegyzés és hozzászólás párosítása
7. ...

Olyan kód generátor ami ennyi mindent legenerálna, nem létezik jelenleg.
Az ilyen állításokat nagyon egyszerű megfogalmazni az Entity Relationship[^1] modell segítségével.

## 2. Összehasonlítás meglévő rendszerekkel

### 2.1 Meglévő kódgenerátorok

#### 2.1.1 Emmet

HTML elemek generálására használják. Jelentősen felgyorsítja a HTML kód írását.

<table>
<tr>
<th>

**Kifejezés**

</th>
<th>

**Generált HTML**

</th>
</tr>
<tr>
<td>

   
`.osztaly>article>h1+p` 

</td>
<td>

```html
<div class="osztaly">
    <article>
        <h1></h1>
        <p></p>
    </article>
</div>
```

</td>
</tr>
</table>

#### 2.1.2 A phoenix CLI (Command Line Interface) beépített kód generátora

A `phoenix` az egy MVC (Model View Controller) tervezési mintán alapuló webes keretrendszer. Egy működő kezelőfelületet hoz létre egy bizonyos adatbázistáblához.

<table>
<tr>
<th>

**Kifejezés**

</th>
<th>

**Legenerált fájlok**

</th>
</tr>
<tr>
<td>

`mix phx.gen.html Accounts User users name:string age:integer`

</td>
<td>

 - context: `lib/app/accounts/accounts.ex` az Accounts API -hoz  
 - schema: `lib/app/accounts/user.ex` és hozzá egy user adatbázis tábla  
 - view: `lib/app_web/views/user_view.ex`  
 - controller: `lib/app_web/controllers/user_controller.ex`  
 - templates: `lib/app_web/templates/user` (listázás, szerkesztés, hozzáadás, stb..)

</td>
</tr>
</table>

A legfőbb hiányossága, hogy nem lehet kapcsolatokat megadni.
A kapcsolatok megadása lehetővé tenné, hogy komplexebb logikát is letudjon generálni. A parancssoros megfogalmazás nem túl felhasználóbarát, de kevés idő alatt megtanulható.

### 2.2 Meglévő ER modell tervező eszközök

Egyes cselekvések Lépésszámainak összehasonlítása (a kevesebb a jobb).

| Eszköz | Egyed létrehozás | Attribútum hozzáadás | Össze-kapcsolás | Törlés |
| --- | --- | --- | --- | --- |
| erdplus.com   | 2   | 4   | 2 + kapcsolat beállítása | 2 |
| draw.io       | sok | sok | túl sok                  | 2 |
| gliffy.com    | sok | sok | túl sok                  | 2 |
| sqldbm.com    | 3   | sok | 3 + kapcsolat beállítás  | 3 |
| smartdraw.com | 2   | sok | túl sok                  | 2 |
| Saját         | 1   | 1   | 1                        | 1 |

Az összehasonlított rendszerek közül egyik sem volt felhasználóbarát. A sok panel miatt a diagramból kevés látszik. Az egyes elemek rendezése gondot okozott.

A saját ER modell tervező, majdnem teljesen panel mentes. Az attribútumok kötve vannak az entitásokhoz mozgatáskor. Az objektumok elrendezésével kevesebbet kell törődni, az automatikus rendezés miatt.

## 3. Alkalmazás terv

### 3.1 Generálandó fájlok

A kódgenerátorral megoldható az, hogy egy szép kód gyorsan elkészüljön. A Terv egy olyan kód generátor, ami egy ER modellhez hasonló modellből, a lehető legtöbb mindent generál. Egy generálási lehetőség a következő fájlokat fogja létrehozni:

- **Adatbázis migrációs fájlok**  
    Az adatbázis binárisan fájlokban van eltárolva. A git nem tudja jól kezelni a bináris fájlok módosításait, végképp nem lenne jó, ha egy _merge conflict_[^2] miatt szöveges módosítást hozna létre a fájlon belül. Az adatbázis sémát migrációs fájlokkal lehet verzió kezelni, ami egyszerű adatbázis utasításokat tartalmaz, annak érdekében, hogy egy sémát létrehozzon, vagy töröljön.
- **Entitás modell** (Szükséges az ORM[^3] -hez)  
    Az Entitás modell egy barátságos interfészt biztosít az adatbázis eléréséhez.
- **Repository**  
     A _repository_ réteg a klasszikus értelemben vett modell réteg. Az ORM nem mindenre tud megoldást adni, ezért modellre nem alkalmas. A repository rétegben használhatunk ORM -től független SQL utasításokat is. Sokszor belefutunk olyan tervezési problémába, hogy 3 réteg nem elég. Ugyanazt a lekérdezést több fájlban is szeretnénk használni, viszont a kód duplikálás elkerülése végett ezeket a lekérdezéseket külön fájlba rakjuk, ezek a fájlok alkotják a repository réteget.
- **Presenter**  
    A _presenter_ feladata, hogy egy kérésből visszaadjon egy statikus információt, a _presenter_ általában nézetet vagy JSON kódot ad vissza.  
    Ez az a réteg az, ami a kérést validálja és interakcióban áll a _repository_ réteggel.
- **View**  
    A _view_ réteg felelős az adatok formázott megjelenítésért. Ide tartoznak a stílusért felelős CSS fájlok és a _view_ dinamikus megjelenését biztosító javascript fájlok is.

### 3.2 Kapcsolatok leképzése

Az entity relationship modellből leképezhető az adatbázis séma. Az elsődleges kulcsokat a programból lehet majd kijelölni, de automatikusan az ID nevűt annak fogja venni. A külső kulcsok kivehetőek a kapcsolatokból. A típusokat a tulajdonságok nevei mellé lehet majd írni. Az egyedek neveit egy mesterséges intelligencia alakítja át egyesszámról többesszámra, amiből lesznek a táblanevek.

### 3.3 sablon fájlok

A fájlok legenerálásához, szükséges sablonokat definiálni. Egy generálási lehetőség több sablonból áll. A generálandó fájlok elhelyezésére is sablon szükséges.

Ha a fájlon nem történik változtatás akkor lehetőség nyílik felülírni is a meglévő fájlokat.
Későbbi fejlesztési lehetőség, hogy módosítás megléte esetén is a módosítás megtartásával lehessen frissíteni a fájlokat.

Egy sablon fájl megkap egy entitást, minden kapcsolatával, így elérhet más entitásokat is. A sablon meghívhatja önmagát, így rekurzív kapcsolatokra is ad lehetőséget.

A sablonfájlok a sablonok szabadsága miatt _javascript_ programozási nyelvel készülnek el.

### 3.4 ER Tervező

#### 3.4.1 Technológia

A tervező webes felületen készül annak érdekében, hogy minden platformon ugyanúgy futhasson.
A javascript ugyanúgy fejlődik mint bármelyik nyelv. Az új verziójú javascriptet nem támogatják a régebbi böngészők. Annak érdekében, hogy használni lehessen az új verziót anélkül, hogy gondot okozna a régebbi böngészőknek, a `babel.js` könyvtár fordítja le a régebbi verzióra.
A javascript nem ad lehetőséget arra, hogy más javascript fájlokat be lehessen importálni a kódba. A fájlok beimportálásáért a `webpack` könyvtár felelős. Ez a projekt _javascript_ fájlaiból létrehoz egy nagy fájlt, a fájlokban megadott import utasítások segítségével.
A tervező nagy része a `canvas` nevű HTML elemben lett megvalósítva, ez azt jelenti, hogy a grafikai elemeket a javascript rajzoltatja ki. A `canvas` egy nagyon primitív elem, nem képes rajzok csoportosítására és nem képes a canvas-en lévő rajzok elkülönítésére, épp ezért nem is lehet közvetlenül lekérdezni, hogy melyik elemre kattintott a felhasználó. Mivel a kattintás pozícióját le lehet kérni, ezen problémák kiküszöbölhetőek. Erre már vannak kész könyvtárak, az egyik ilyen a `Konva.js`. A `Konva` nem biztosít elég eszközt arra, hogy kényelmesen lehessen fejleszteni vele, ezért létre kellett hoznom egy saját keretrendszert, a `canvas` alkalmazások fejlesztésére.

### 3.4.2 Saját keretrendszer

#### 3.4.2.1 felépítés

A canvas csak rajzolásra való, viszont a rajzolás részletei miatt nem átlátható az üzleti logika.
Ennek megoldására el kell különíteni az egyes részeket feladatkör szerint. Az elkülönítésre nagyon jó példa a HTML és a CSS. A HTML alapján van egy strukturális felépítésért felelős fájl, ami megmondja, hogy egy elem milyen más elemekből épül fel, milyen kapcsolatban vannak egymással és, hogy milyen eseményekre kell figyelnie. Van stílus, ami az elemek formázásáért felelős. Van egy modell ami az információk tárolásának ad egy struktúrát és van egy fájl ami ezt a hármat összefogja és egy új elemként definiálja azt.

#### 3.4.2.2 Stílus

A stílusfájl a CSS -hez hasonlóan csak tulajdonságokat sorol fel.

```javascript
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
```

#### 3.4.2.3 Struktúra

A struktúra fájl egy függvényt tartalmaz ami elkészíti a struktúrát, a paraméterek alapján.  

Belehet állítani, hogy az elem egérrel húzható legyen.

```javascript
props.draggable = true
```

Meglehet adni, hogy az elem milyen elemekből épüljön fel.

```javascript
props.children = {
    bg: new EllipseShape,
    text: new EditableText,
    deleteButton: new DeleteButton
}
```

Meg lehet mondani az automatikus rendezőnek, hogy vegye figyelembe az aktuális elemet.

```javascript
props._arranger_enabled = true
props._arrangerBoundingType = function(element, to) {
    return BoundingBox(props.children.bg, to)
}
```

Be lehet állítani, hogy mely eseményekre figyeljen.

```javascript
props.events = {
    onDelete: new EventRegister(props.children.deleteButton, 'click'),
    onChangeText: new EventRegister(props.children.text, 'dblclick'),
}
```

Meg lehet mondani, hogy egyes elemek változására, hogy változzanak más elemek. (Pl: ha a szöveg hossza változik akkor a háttérnek a szélessége is változzon)

```javascript
props.anchors = {
    bgSize: new WidthAnchor(props.children.text, props.children.bg, {
        padding: 20,
    })
}
```

#### 3.4.2.4 Modell

A modell csak struktúrát biztosít a fájlhoz. De opcionálisan implementálhat egy `toArray` nevű függvényt, ami az információkat JSON formátumba konvertálhatóan visszaadja.

#### 3.4.2.5 Elem fájl

Ez a fájl foglalja össze a 3 fájl szerepét.
Ebben a fájlban található meg az üzleti logika. Azok az események amiket a struktúra fájlban definiáltunk, ezekre a függvényekre hivatkoznak és meghívódnak ha az esemény bekövetkezik.

```javascript
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
```

#### 3.4.2.6 Amiért jó

A kód sokkal átláthatóbb. Elkerülhető vele a kód duplikálás. A komponensek nem függenek szorosan össze, így bármikor cserélhetőek, viszont az általános célra egy nagyon kényelmes, átlátható és gyors megoldást lehet vele biztosítani.

## 4. Végszó

A weboldalfejlesztés iránti igények egyre csak nőnek. A fejlesztőkből hiány van. A gyors fejlesztés ugyanolyan fontos mint a minőségi kód, de, hogy a fejlesztők kedve ne menjen el, a hasonló kódok újbóli megírása miatt ezeket inkább generáljuk.  

[^1]: Az ER (Entity Relationship) modell, nevéből adódóan egyedeket és azok kapcsolatait képes, hétköznapi emberek számára is érthető formában megjeleníteni.

[^2]: A git verziókezelő rendszer két eltérő módosítás egyesítésekor az adott fájlba beleírja mind a 2 módosítást és információt az adott módosításról.

[^3]: Az ORM (Object-Relational Mapping) egy olyan rendszer, ami az adatbázis táblákat objektumokra képezi le, ezzel elérve azt, hogy objektum orientált módon lehessen kezelni az adatbázist, az alkalmazáson belül.