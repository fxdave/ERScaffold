import Connection from './Connection';
import One from './One';

class OneToOne extends Connection {
  fromComponent = Comp => Comp(One);

  toComponent = Comp => Comp(One);
}

export default OneToOne;
