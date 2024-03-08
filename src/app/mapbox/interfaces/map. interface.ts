import { LngLat } from "mapbox-gl";


export interface MapboxMap {
    container: string | HTMLElement,
    style?: string,
    center?:  LngLat | undefined,
    zoom?: number
}