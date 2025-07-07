import { StrictMode, useState, type ChangeEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { v4 as uuidv4 } from 'uuid';
import { ItemLista } from './item_lista';

export interface Tarefa {
    tarefa: string
    id: string
    completado: boolean,
}


const TAREFAS_PADRAO = [
    {
        id: uuidv4(),
        tarefa: "Lavar Louça",
        completado: false
    },
    {
        id: uuidv4(),
        tarefa: "Fazer Comida",
        completado: false
    },
    {
        id: uuidv4(),
        tarefa: "Estudar",
        completado: false
    },
]

function App() {
    const [tarefa, setTarefa] = useState("");
    const [tarefas, setTarefas] = useState<Tarefa[]>(TAREFAS_PADRAO);


    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setTarefa(event.target.value)
    };


    function handleClick() {
        const novaTarefa = {
            tarefa, id: uuidv4(), completado: false
        }
        setTarefas([...tarefas, novaTarefa])
    };
    console.log(tarefas);

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <div>
                <input type='text' value={tarefa} onChange={handleChange} />
                <button onClick={handleClick}>
                    Clique aqui
                </button>
                <h2>Tarefas a fazer</h2>
                <ul>
                    {tarefas.filter(function (itemDoFilter) {
                        if (itemDoFilter.completado == true)
                            return false
                        else
                            return true
                    }).map((itemAtual) => <ItemLista key={itemAtual.id} setTarefas={setTarefas} item={itemAtual} />)}
                </ul>
                <h2>Tarefas completadas</h2>
                <ul>
                    {tarefas.filter(function (itemDoFilter) {
                        if (itemDoFilter.completado == true)
                            return true
                        else
                            return false
                    }).map((itemAtual) => <ItemLista key={itemAtual.id} setTarefas={setTarefas} item={itemAtual} />)}
                </ul>
            </div>
        </div>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)