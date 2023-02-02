import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, useDisclosure, Table, Thead, Tr, Th, Tbody, Td, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { ModalComp } from "./components/ModalComp";

export function App() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState({});
    
    const isMobile = useBreakpointValue({ base: true, lg: false });

    useEffect(() => {
        const data = localStorage.getItem("data")
            ?JSON.parse(localStorage.getItem("data"))
            : [];
        setData(data);
    }, [setData]);

    const handleRemove = (id) => {
        const newData = data.filter((item) => item.id !== id);

        setData(newData);

        localStorage.setItem("data", JSON.stringify(newData));
    }

    
    return (
        <Flex
            h="100vh"
            align="center"
            justify="center"
            fontSize="20px"
            fontFamily="poppins"
        >
            <Box maxW={1000} w="100%" h="100vh" py={10} px={2}>
                <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
                NOVO CADASTRO
                </Button>
                <Box overflow="auto" height="100%">
                    <Table mt="6">
                        <Thead>
                            <Tr>
                                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                                    ID
                                </Th>
                                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                                    Nome
                                </Th>
                                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                                    Email
                                </Th>
                                <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                                    Senha
                                </Th>
                                <Th p={0}></Th>
                                <Th p={0}></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map(({ id, name, email, password }, index) => (
                                <Tr key={index} cursor="pointer" _hover={{ bg: "gray.100" }}>
                                    <Td maxW={isMobile ? 5 : 100}>{ id }</Td>
                                    <Td maxW={isMobile ? 5 : 100}>{ name }</Td>
                                    <Td maxW={isMobile ? 5 : 100}>{ email }</Td>
                                    <Td maxW={isMobile ? 5 : 100}></Td>
                                    <Td p={0}>
                                        <EditIcon
                                            fontSize={20}
                                            onClick={() => [
                                                setDataEdit({ id, name, email, password, index }),
                                                onOpen(),
                                            ]}
                                        />
                                    </Td>
                                    <Td p={0}>
                                        <DeleteIcon
                                            fontSize={20}
                                            onClick={() => handleRemove(id)}
                                        />                                        
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
            {isOpen && (
                <ModalComp
                    isOpen={isOpen}
                    onClose={onClose}
                    data={data}
                    setData={setData}
                    dataEdit={dataEdit}
                    setDataEdit={setDataEdit}
                />
            )}
        </Flex>
    )
}
    