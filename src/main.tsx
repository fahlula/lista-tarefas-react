import { StrictMode, useState, type ChangeEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { v4 as uuidv4 } from 'uuid';
import { ItemLista } from './item_lista';
import { Button, Card, CardBody, Col, Container, InputGroup, Row } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa6';

import './reset.css'
import './index.css'


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
    const [erro, setErro] = useState(false);



    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setErro(false)
        setTarefa(event.target.value)
    };


    function handleClick() {
        if (tarefa == "")
            return setErro(true)

        const novaTarefa = {
            tarefa, id: uuidv4(), completado: false
        }
        setTarefas([...tarefas, novaTarefa])

        setTarefa("")
    };

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <Card className='p-2 mt-3'>
                        <CardBody>
                            <h1 className='h1-1 mb-4'>Lista de Tarefas</h1>
                            <InputGroup>
                                <input 
                                    placeholder="Digite aqui a tarefa a ser adicionada" 
                                    className={`form-control ${erro==true && 'is-invalid'}`}
                                    type='text' 
                                    value={tarefa} 
                                    onChange={handleChange} 
                                />
                                <Button size='sm' onClick={handleClick}>
                                    <FaPlus/>
                                </Button>
                            </InputGroup>
                            <h2 className='h2-2 my-3'>Tarefas a fazer</h2>
                            <ul>
                                {tarefas.filter(function (itemDoFilter) {
                                    if (itemDoFilter.completado == true)
                                        return false
                                    else
                                        return true
                                }).map((itemAtual) => <ItemLista key={itemAtual.id} setTarefas={setTarefas} item={itemAtual} />)}
                            </ul>
                            <h2 className='h2-2 my-3'>Tarefas completadas</h2>
                            <ul>
                                {tarefas.filter(function (itemDoFilter) {
                                    if (itemDoFilter.completado == true)
                                        return true
                                    else
                                        return false
                                }).map((itemAtual) => <ItemLista key={itemAtual.id} setTarefas={setTarefas} item={itemAtual} />)}
                            </ul>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)