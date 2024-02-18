const GeoSettings: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 12000,
    maximumAge: 30000,
}

export const getPosition = function (): Promise<GeolocationPosition> {
    return new Promise<GeolocationPosition>(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, GeoSettings);
    });
}
