const requestPathKey = "request-url"

export const storeRequestUrl = () => {
    localStorage.setItem(requestPathKey, window.location.href)
}

export const getRequestUrl = (): string | null => {
    return localStorage.getItem(requestPathKey)
}

export const clearRequestUrl = () => {
    localStorage.removeItem(requestPathKey)
}