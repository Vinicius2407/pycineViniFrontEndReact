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

export function ModalComp({ data, setData, dataEdit, isOpen, onClose }) {
    const [name, setName] = useState(dataEdit.name || "");
    const [email, setEmail] = useState(dataEdit.email || "");
    const [password, setPassword] = useState(dataEdit.password || "");
    
    const handleSave = () => {
        if (!name || !email || !password) {
            alert("Preencha todos os campos!");
            return;
        }

        if (emailAlreadyExists()) {
            return alert("Email já cadastrado!");
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { name, email, password };
        }

        const newDataArray = !Object.keys(dataEdit).length
            ? [...(data ? data : []), { name, email, password }]
            : [...(data ? data : [])];
        
        localStorage.setItem("data", JSON.stringify(newDataArray));

        setData(newDataArray);

        onClose();
    }

    const emailAlreadyExists = () => {
        if (dataEdit.email !== email && data?.length) {
            return data.find((item) => item.email === email);
        }
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Cadastro de Clientes</ModalHeader>
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
                                <FormControl>Senha</FormControl>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
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