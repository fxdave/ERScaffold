export class Relation {
  constructor(from, to) {
      this.from = from
      this.to = to
  }
  
  getFrom() {
      return this.from
  }

  getTo() {
      return this.to
  }
}

export class HasManyRelation extends Relation {}
export class BelongsToRelation extends Relation {}
export class HasOneRelation extends Relation {}
export class BelongsToManyRelation extends Relation {}
