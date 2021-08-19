const debugJwt = (header) => {
    const getUserPayload = header.slice(
        header.indexOf('.'),
        header.lastIndexOf('.')
    )
    const getUserDetails = Buffer.from(getUserPayload, 'base64').toString()
    return JSON.parse(getUserDetails)
}

module.exports = debugJwt