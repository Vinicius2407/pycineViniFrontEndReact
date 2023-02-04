import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

export function FormModal({ dataEdit, isOpen, onClose, handleRefresh }) {
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");
    const [editPassword] = useState(dataEdit.password || "");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    async function handleSave() {
        if (dataEdit.id && editPassword !== "" && password === editPassword) {
            await axios.put(`http://127.0.0.1:8000/user/update`, {
            id: dataEdit.id,
            name,
            email,
            password
            });
        } else if (dataEdit.id === undefined) {
            if (!name || !email || !password) {
                alert("Preencha todos os campos");
            }

            const response = await axios.post("http://127.0.0.1:8000/user/create", {
                name,
                email,
                password,
            });
    
            if (response.status !== 200) {
                alert("Email já cadastrado");
            } 
        }
        handleRefresh();
        onClose();
    } 

    const verificacao = dataEdit.id ? "Editar" : "Novo Cadastro";

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{verificacao}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl display="flex" flexDir="column" gap={4}>
                            <Box>
                                <FormControl>Nome</FormControl>
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormControl>Email</FormControl>
                                <Input
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                            <Box>
                                <FormControl>{editPassword !== "" ? "Coloque a senha para editar" : "Insira a Senha"}</FormControl>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Button onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? "Ocultar" : "Mostrar"} Senha
                                </Button>
                            </Box>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={handleSave}>
                            SALVAR
                        </Button>
                        <Button colorScheme="red" onClick={onClose}>
                            CANCELAR
                        </Button>
                    </ModalFooter>    
                </ModalContent>
            </Modal> 
        </>
    )
}