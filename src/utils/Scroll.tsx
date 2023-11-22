export const resetToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

export const isScrolled = (): boolean => {
    return document.body.scrollTop > 100 || document.documentElement.scrollTop > 100
}