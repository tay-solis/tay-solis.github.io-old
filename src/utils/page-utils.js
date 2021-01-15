/*
Creates an object based a page query:
{
    id: '', // System ID
    uid: '', // User Inputted Id, used as slug
    type: '', // API ID for page type
    title: ''
    slugs: [''],
    data: {
        results depend on page type
    },
}
*/

const getSimplePageInfo = page => {
    const { id, type, slugs, data } = page;
    const title = data.title;
    return {
        title,
        id,
        type,
        slugs,
        data
    }
}

export { getSimplePageInfo };
