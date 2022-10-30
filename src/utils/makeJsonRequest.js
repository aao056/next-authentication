export default async function makeJsonRequest(url, payload = {})
{
    let response
    try {
        response = await fetch(
            url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })
    } catch(err) {
        console.log(err)
        return false
    }
    return response.json()
}