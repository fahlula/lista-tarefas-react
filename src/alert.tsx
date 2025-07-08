import { FaCircleExclamation } from "react-icons/fa6";

export function Alert() {
    return (
        <div className='text-warning h3 text-center mt-3' >
            <FaCircleExclamation className='mx-1' style={{
                position: 'relative',
                bottom: '2px'
            }}
            />
            Não há tarefas
        </div>
    )
}