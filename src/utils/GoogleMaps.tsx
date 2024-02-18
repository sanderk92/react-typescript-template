export function showLocation(longitude: number, latitude: number) {
    window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, "_blank")
}
