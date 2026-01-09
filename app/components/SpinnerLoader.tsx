import { useEffect, useState } from "react"

const SpinnerLoader = () => {

    const [text, setText] = useState('');
    const [showImg, setShowImg] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setText(
                'Esperará 3 segundos'
            )   
        }, 3000)
    }, [])

    return (
    <>
        <div>
            {
                showImg ? (
                    <div className="fixed inset-0 z-[999] absolute inset-0 flex items-center justify-center bg-transparent-custom">
                        <img src="/spinner.svg" alt="spinner" className=""/>
                    </div>
                ) : (
                    <h3>{text}</h3>
                )
            }
        </div>
    </>
  )
}

export default SpinnerLoader