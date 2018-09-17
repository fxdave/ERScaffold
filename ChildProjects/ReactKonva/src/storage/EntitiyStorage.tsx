import IStorage from './IStorage'
class EntityStorage implements IStorage {

    public entities : any[] = []

    public add(entitiy :any)  {
        this.entities.push(entitiy)
    }

    public remove(entitiy : any) {
        this.entities.push(entitiy)
    }
}

export default EntityStorage
