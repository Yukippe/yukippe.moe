import * as util from './lib/util'

import preload_json from './config/preload'


util.setRingSize()
//util.bindNav()


util.startLoading(() => {
    util.preload(preload_json, () => {
        util.finLoad()
    }, data => {})
})