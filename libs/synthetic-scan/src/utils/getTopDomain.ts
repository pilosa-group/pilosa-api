export const getTopDomain = (url: string) => {
    const domain = new URL(url).hostname;

    return domain.split('.').slice(-2).join('.');
}