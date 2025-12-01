export const load = async ({ params }) => {
    const slug = params.characterID;

    return {
        characterID: slug
    };
}