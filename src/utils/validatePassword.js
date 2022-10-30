// https://stackoverflow.com/a/40923568
export default function validatePassword(password) {
  return String(password).match(
    /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  )
}
