export const isKeyExists = (obj) => {
    if (!obj) return false;
    return  !obj.length && Object.keys(obj)?.length > 0;
}