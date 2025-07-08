import { StrictMode, useEffect, useState, type ChangeEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { v4 as uuidv4 } from 'uuid';
import { Button, Card, CardBody, Col, Container, InputGroup, Row } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa6';
import { Tarefas } from './tarefas';

import './reset.css'
import './index.css'


export interface Tarefa {
    tarefa: string
    id: string
    completado: boolean,
}

function App() {
    const [inputAdicionar, setInputAdicionar] = useState("");
    const [tarefas, setTarefas] = useState<Tarefa[]>(JSON.parse(localStorage.getItem('tarefas')|| ""));
    const [erro, setErro] = useState(false);

    useEffect(() => {
        localStorage.setItem("tarefas", JSON.stringify(tarefas))
    })

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setErro(false)
        setInputAdicionar(event.target.value)
    };


    function handleClick() {
        if (inputAdicionar == "")
            return setErro(true)

        const novaTarefa = {
            tarefa: inputAdicionar, id: uuidv4(), completado: false
        }
        setTarefas([...tarefas, novaTarefa])

        setInputAdicionar("")
    };

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col md={6}>
                    <Card className='p-2 mt-3'>
                        <CardBody>
                            <h1 className='h1 mb-4'>Lista de Tarefas</h1>
                            <InputGroup>
                                <input
                                    placeholder="Digite aqui a tarefa a ser adicionada"
                                    className={`form-control ${erro == true && 'is-invalid'}`}
                                    type='text'
                                    value={inputAdicionar}
                                    onChange={handleChange}
                                />
                                <Button size='sm' onClick={handleClick}>
                                    <FaPlus />
                                </Button>
                            </InputGroup>
                            <h2 className='h2 my-3'>
                                Tarefas a Fazer
                            </h2>
                            <Tarefas tarefas={tarefas.filter(function (itemDoFilter) {
                                if (itemDoFilter.completado == false)
                                    return true
                                else
                                    return false
                            })} setTarefas={setTarefas} />
                            <h2 className='h2 my-3'>
                                Tarefas Completadas
                            </h2>
                            <Tarefas tarefas={tarefas.filter(function (itemDoFilter) {
                                if (itemDoFilter.completado == true)
                                    return true
                                else
                                    return false
                            })} setTarefas={setTarefas} />
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