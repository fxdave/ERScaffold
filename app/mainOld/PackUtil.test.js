import assert from 'assert';
import PackUtil from './PackUtil';
import Entity from './model/Entity';

describe('PackUtil', () => {
  describe('get packs', () => {
    it('test1', () => {
      PackUtil.getPacks()
        .then(packs => {
          console.log(JSON.stringify(packs));
        })
        .catch(err => {
          console.error(err);
        });
    });
  });

  describe('get packs for entities', () => {
    it('test1', () => {
      PackUtil.getFilteredPacksForEntities([
        new Entity(1, 'asd', []),
        new Entity(2, 'asd', [])
      ])
        .then(packs => {
          console.log(JSON.stringify(packs));
        })
        .catch(err => {
          console.error(err);
        });
    });
  });
});
