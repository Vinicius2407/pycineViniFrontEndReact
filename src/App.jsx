import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Box, Flex, Button, useDisclosure, Table, Thead, Tr, Th, Tbody, Td, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

import { FormModal } from "./components/FormModal";

export function App() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState([]);
    const [dataEdit, setDataEdit] = useState({});
    const [refresh, setRefresh] = useState(false);
    
    function handleRefresh() {
        setRefresh(!refresh);
    }
    
    async function getData() {
        await axios.get("http://127.0.0.1:8000/users/list")
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    async function handleRemove(id){
        console.log(id);
        await axios.delete("http://127.0.0.1:8000/users/delete/" + id);
        handleRefresh();
    }

    useEffect(() => {
        getData();
    }, [refresh]);

    return (
        <Flex
            h="100vh"
            align="center"
            justify="center"
            fontSize="20px"
            fontFamily="poppins"
            background="gray.100"
        >
            <Box maxW={1200} w="100%" h="100vh" py={10} px={2}>
                <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
                NOVO CADASTRO
                </Button>
                <Box overflow="auto" height="100%">
                    <Table mt="6">
                        <Thead>
                            <Tr>
                                <Th maxW={100} fontSize="20px">
                                    ID
                                </Th>
                                <Th maxW={100} fontSize="20px">
                                    Nome
                                </Th>
                                <Th maxW={100} fontSize="20px">
                                    Email
                                </Th>
                                {/* <Th maxW={isMobile ? 5 : 100} fontSize="20px">
                                    Senha
                                </Th> */}
                                <Th p={0}></Th>
                                <Th p={0}></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map(({ id, name, email, password }, index) => (
                                <Tr key={id} cursor="pointer" _hover={{ bg: "gray.100" }}>
                                    <Td maxW={100}>{ id }</Td>
                                    <Td maxW={100}>{ name }</Td>
                                    <Td maxW={100}>{ email }</Td>
                                    {/* <Td maxW={100}></Td> */}
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
                <FormModal
                    isOpen={isOpen}
                    onClose={onClose}
                    data={data}
                    setData={setData}
                    dataEdit={dataEdit}
                    setDataEdit={setDataEdit}
                    handleRefresh={handleRefresh}
                />
            )}
        </Flex>
    )
}
    