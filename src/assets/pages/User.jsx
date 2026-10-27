import {useState} from "react"
export const User = () =>{
    const [users,setUsers] = useState("hello je i lvoe you je")

    //low level
    function handle(){
        return alert(`course : ${users}`)
    }
    // hight level sort cut
    const handleclick = () =>{
        alert(`course : ${users}`)
    }



    return(
        <>
        <button type="button" onClick={handleclick}>Click</button>
        </>
    )
}