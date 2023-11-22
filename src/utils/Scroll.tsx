export const resetToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

export const isScrolled = (px: number): boolean => {
    return document.body.scrollTop > px || document.documentElement.scrollTop > px
}