/**
 * @param {String} attribute
 * @param {Array} routes
 */
export function getInheritanceMetaAttribute (attribute, routes) {
    return routes.reduce((acc, route) => {
        if (attribute in route.meta) {
            return route.meta[attribute]
        }
        return acc
    }, false)
}

/**
 * @param {String} routePerm
 * @param {Array} userPerm
 */
export function matchUserPermissions (routePerm, userPerm) {
    return userPerm.find(value => {
        const compare = value.permission.localeCompare(routePerm)
        if (compare === 0) {
            return true
        }
        return false
    })
}
