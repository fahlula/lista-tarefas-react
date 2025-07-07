import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid';
import type { Tarefa } from './main';

interface ItemListaProps {
    item: Tarefa
    setTarefas: Dispatch<SetStateAction<Tarefa[]>>
}

export function ItemLista({ item, setTarefas }: ItemListaProps) {
    const [value, setValue] = useState(item.tarefa);
    const [disabled, setDisabled] = useState(true);


    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value)
    };

    function handleClickEditar() {
        setDisabled(false);
    };


    function handleClickSalvar() {
        setTarefas(function (tarefasAtuais) {
            const tarefasModificadas = tarefasAtuais.map(function (itemDoMap) {
                if (item.id == itemDoMap.id)
                    return ({
                        ...itemDoMap,
                        id: uuidv4(),
                        tarefa: value
                    })
                else
                    return itemDoMap
            });

            return [...tarefasModificadas]
        })
    };

    function handleClickDeletar() {
        setTarefas(function (tarefasAtuais) {
            const tarefasModificadas = tarefasAtuais.filter(function (itemDoFilter) {
                if (item.id == itemDoFilter.id)
                    return false
                else
                    return true
            });

            return [...tarefasModificadas]
        })
    };

    function handleClickCompletar() {
        setTarefas(function (tarefasAtuais) {
            const tarefasModificadas = tarefasAtuais.map(function (itemDoMap) {
                if (item.id == itemDoMap.id)
                    return ({
                        ...itemDoMap,
                        id: uuidv4(),
                        completado: true
                    })
                else
                    return itemDoMap
            });

            return [...tarefasModificadas]
        })
    };

        function handleClickDescompletar() {
        setTarefas(function (tarefasAtuais) {
            const tarefasModificadas = tarefasAtuais.map(function (itemDoMap) {
                if (item.id == itemDoMap.id)
                    return ({
                        ...itemDoMap,
                        id: uuidv4(),
                        completado: false
                    })
                else
                    return itemDoMap
            });

            return [...tarefasModificadas]
        })
    };

    return (
        <li>
            <input disabled={disabled} value={value} onChange={handleChange} />
            {item.completado == false ? (
                <>
                    <button disabled={!disabled} onClick={handleClickEditar}>Editar</button>
                    <button disabled={disabled} onClick={handleClickSalvar}>Salvar</button>
                    <button disabled={!disabled} onClick={handleClickDeletar}>Deletar</button>
                    <button disabled={!disabled} onClick={handleClickCompletar}>Completar</button>
                </>
            ) : (
                <>
                    <button onClick={handleClickDescompletar}>Adicionar na lista</button>
                </>
            )
            }
        </li>
    )
}