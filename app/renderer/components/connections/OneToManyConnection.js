import Connection from './Connection';
import One from './One';
import Many from './Many';

class OneToMany extends Connection {
  fromComponent = Comp => Comp(One);

  toComponent = Comp => Comp(Many);
}

export default OneToMany;
