import Arranger from "../Utils/Arranger/Arranger";
import BoundingBox from "../Utils/Arranger/BoundingBox";
/*
 *  
 * arranger: {
 *  element: this.$refs.asd.getStage(),
 *  boundingShape: BoundingBox,
 *  filteringDistance: 9000,
 *  minimalDistance: 1000
 * }
 */
export default {
    mounted: function () {
        this.$nextTick(function () {
            let arrangerConfig = this.$options.arranger

            if (arrangerConfig) {
                arrangerConfig = arrangerConfig.bind(this)
                let cfg = arrangerConfig()
                let el = cfg.element

                if (cfg.boundingShape) {
                    el._arrangerBoundingType = cfg.boundingShape
                }
                if (cfg.filteringDistance) {
                    el._arrangerMinimalRawSpace = cfg.filteringDistance
                }
                if (cfg.minimalDistance) {
                    el._arrangerMinimalSpace = cfg.minimalDistance
                }
                if (cfg.update) {
                    cfg.update.bind(this)
                    el._arragnerUpdate = cfg.update
                }
                Arranger.add(el)
            }
        })
    }, beforeDestroy: function () {
        let arrangerConfig = this.$options.arranger

        if (arrangerConfig) {
            arrangerConfig = arrangerConfig.bind(this)
            let cfg = arrangerConfig()
            let el = cfg.element
            Arranger.remove(el)
        }
    }
}