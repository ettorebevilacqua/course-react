import { useEffect } from "react";

export default function App() {
    useEffect(()=>{
        console.log('start')
    },[])
       return <div>Hello!</div>;
  }