import pluralize from 'pluralize'

class Formatter {

    static getTags(what) {
        let regex = /[A-Z]?[a-z]+|[A-Z]/g
        let m
        let tags = []
        while ((m = regex.exec(what)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++
            }
            
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                //console.log(`Found match, group ${groupIndex}: ${match}`)
                tags.push(match)
            })
        }

        return tags
    }

    static upperCamelCase(what) {
        return Formatter.getTags(what).map( tag => {
            let splitted = tag.split('')
            splitted[0] = splitted[0].toUpperCase()
            return splitted.join('')
        }).join('')
    }

    static lowerCamelCase(what) {
        let first = true
        return Formatter.getTags(what).map( tag => {
            let splitted = tag.split('')

            if(first) {
                first = false
                splitted[0] = splitted[0].toLowerCase()
            } else {
                splitted[0] = splitted[0].toUpperCase()
            }
            
            return splitted.join('')
        }).join('')
    }

    static snakeCase(what) {
        return Formatter.getTags(what).map(tag => {
            return tag.toLowerCase()
        }).join('_')
    }

    static kebabCase(what) {
        return Formatter.getTags(what).map(tag => {
            return tag.toLowerCase()
        }).join('-')
    }

    static plural(what) {
        let tags = this.getTags(what)
        return what.replace(tags[tags.length-1], pluralize.plural(tags[tags.length-1]), what)
    }

    static singular(what) {
        let tags = this.getTags(what)
        return what.replace(tags[tags.length-1], pluralize.singular(tags[tags.length-1]), what)
    }

    static normal(what) {
        let tags = this.getTags(what).map(tag => tag.toLowerCase())
        let tagsFirstSplit = tags[0].split()
        tagsFirstSplit[0] = tagsFirstSplit[0].toUpperCase()
        tags[0] = tagsFirstSplit.join('')
        return tags.join(' ')
    }


}

export default Formatter