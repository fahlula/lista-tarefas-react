import type { Dispatch, SetStateAction } from "react";
import { ItemLista } from "./item_lista";
import type { Tarefa } from "./main";

export interface TarefasProps{
        tarefas: Tarefa[]
        setTarefas: Dispatch<SetStateAction<Tarefa[]>>
}

export function ListaTarefas({ tarefas, setTarefas }: TarefasProps) {
    return (
        <>
            <ul>
                {tarefas.map((itemAtual) => <ItemLista key={itemAtual.id} setTarefas={setTarefas} item={itemAtual} />)}
            </ul>
        </>
    )
}