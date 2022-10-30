export default function getCookie(cookies, name) {

    if (!cookies) return null

    cookies = cookies.split('; ')

    let value

    for (let i = 0; i < cookies.length; i++) {

        const cookie = cookies[i].trim()
        const parts = cookie.split('=')

        if (parts[0] === name) {
            value = parts[1]
            break
        }

    }

    return value

}
