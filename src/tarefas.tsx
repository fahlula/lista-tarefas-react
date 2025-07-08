import type { Tarefa } from "./main"
import type { Dispatch, SetStateAction } from "react"
import { Alert } from "./alert"
import { ListaTarefas } from "./lista_tarefas"

export interface TarefasProps {
    tarefas: Tarefa[]
    setTarefas: Dispatch<SetStateAction<Tarefa[]>>
}

export function Tarefas({ tarefas, setTarefas }: TarefasProps) {
    return (
        <>
            {tarefas.length == 0 ? <Alert /> : <ListaTarefas setTarefas={setTarefas} tarefas={tarefas} /> }
        </>
    )
}