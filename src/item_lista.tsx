import { useState, type ChangeEvent, type Dispatch, type SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid';
import type { Tarefa } from './main';
import { Button, InputGroup } from 'react-bootstrap';
import { FaFloppyDisk, FaPencil, FaTrash, FaCheck } from "react-icons/fa6";

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
        <li className='my-1'>
            <InputGroup>
                <input className='form-control' disabled={disabled} value={value} onChange={handleChange} />
                {item.completado == false ? (
                    <>
                        <Button title='Editar' variant= 'warning' size='sm' disabled={!disabled} onClick={handleClickEditar}>
                            <FaPencil/>
                        </Button>
                        <Button title='Salvar'size='sm' variant='success' disabled={disabled} onClick={handleClickSalvar}>
                            <FaFloppyDisk/>
                        </Button>
                        <Button title='Deletar' size='sm' variant='danger'disabled={!disabled} onClick={handleClickDeletar}>
                            <FaTrash/>
                        </Button>
                        <Button title='Completar' size='sm' disabled={!disabled} onClick={handleClickCompletar}>
                            <FaCheck/>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button size='sm' variant='secondary' onClick={handleClickDescompletar}>Adicionar na lista</Button>
                    </>
                )
                }
                </InputGroup>
        </li>
    )
}