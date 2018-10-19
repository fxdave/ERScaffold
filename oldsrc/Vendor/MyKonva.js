import Konva from './Konva'
import LifeCycleDecorator from '../Utils/Decorators/LifeCycleDecorator';

//console.log(new Konva.Container);

Konva.Container = LifeCycleDecorator(Konva.Container)
Konva.Group = LifeCycleDecorator(Konva.Group)
Konva.Layer = LifeCycleDecorator(Konva.Layer)
export default Konva