import Connection from './Connection';
import Many from './Many';

class ManyToMany extends Connection {
  fromComponent = Comp => Comp(Many);

  toComponent = Comp => Comp(Many);
}

export default ManyToMany;
