//global function to use in different files (Review Silvan Gehrig 19.06.2019)
export const urlId = () => {
    const queryString = window.location.search;
    const searchParams = new URLSearchParams(queryString);
    return searchParams.get('id');

};