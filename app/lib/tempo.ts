import { TempoType } from "../types";

export const formatTempo = (tempo?: TempoType) => {
    if(!tempo) return ''

    return `${tempo.up} - ${tempo.uphold} - ${tempo.down} - ${tempo.downhold}`
}
