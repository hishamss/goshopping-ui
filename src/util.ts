import { Location } from 'history';

export function capitalize(string : string) {
    return string[0].toUpperCase() + string.slice(1);
}

export function getPathVar(location : Location) {
    return location.pathname.split(/\/.*?\//)[1];
}