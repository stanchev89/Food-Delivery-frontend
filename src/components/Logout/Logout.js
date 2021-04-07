import userService from "../../services/userService";

export default ({history,setUser}) => {
    userService.logout()
        .then(() => {
            setUser(undefined);
            history.push('/')
        })
        .catch(console.error)

    return (
        null
    )
}