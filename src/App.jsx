import axios from "./util/axios.customize"
import { useEffect } from "react"
function App() {
  useEffect(() => {
    const fetchHelloworld = async () => {
      const res = await axios.get(`/api`)
    }
    fetchHelloworld()
  }, [])
  return (
    <>

    </>
  )
}

export default App
