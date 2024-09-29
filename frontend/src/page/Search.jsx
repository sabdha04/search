import { useEffect, useState } from "react";
import {
    Input, Spinner, Box, Text, Button, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Flex, useToast, IconButton, Tooltip
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import axios from "axios";

export default function Search() {

    const toast = useToast();

    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isShowAll, setIsShowAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/home-data",
                    {
                        params: { search: searchTerm },
                    }
                );
                const fetchedData = response.data;

                // Filter data berdasarkan nilai "isShowAll"
                const filtered = isShowAll
                    ? fetchedData
                    : fetchedData.filter((item) => item.pp_is_deleted !== 1);

                setData(fetchedData);
                setFilteredData(filtered);
            } catch (err) {
                console.error("Error:", err);
                setError("Gagal mengambil data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchTerm, isShowAll]);

    // Menghandle perubahan input pencarian
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter data berdasarkan nilai pencarian
        const filtered = data.filter(
            (item) =>
                item.bp_id.toLowerCase().includes(value.toLowerCase()) ||
                item.hk_name.toLowerCase().includes(value.toLowerCase()) &&
                item.pp_is_deleted !== 1
        );
        setFilteredData(filtered);
    };


    // Fungsi untuk menyembunyikan data
    const handleHide = async (id, isHidden) => {
        if (!window.confirm(`Apakah Anda yakin ingin ${isHidden ? "menampilkan" : "menyembunyikan"} data ini?`))
            return;

        try {
            await axios.put(`http://localhost:5000/api/home-data/${id}/hide`);


            setFilteredData((prevData) =>
                prevData.map((item) =>
                    item.pp_id === id
                        ? { ...item, pp_is_deleted: isHidden ? null : 1 }
                        : item
                )
            );

            toast({
                title: "Berhasil",
                description: `Data berhasil ${isHidden ? "ditampilkan" : "disembunyikan"}.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            console.error("Error:", err);
            toast({
                title: "Gagal",
                description: `Gagal ${isHidden ? "menampilkan" : "menyembunyikan"} data.`,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <>
            <Flex minHeight="100vh" p={4}>
                <Box p={4} width="100%">
                    <Flex>

                    </Flex>
                    <Input marginTop="50px"
                        placeholder="Cari data..."
                        value={searchTerm}
                        onChange={handleSearch}
                        width="400px"
                    />
                    <Button
                        backgroundColor="#002966"
                        _hover={{ backgroundColor: "#cca600", textColor: "white" }}
                        textColor="white"
                        marginInline="4"
                        onClick={() => setIsShowAll(true)}
                    >
                        Show All
                    </Button>

                    <Button
                        backgroundColor="#002966"
                        _hover={{ backgroundColor: "#cca600", textColor: "white" }}
                        textColor="white"
                        marginInline="4"
                        onClick={() => setIsShowAll(false)}
                    >
                        Normal View
                    </Button>

                    <br /><br />

                    {loading && (
                        <Box textAlign="center" my={4}>
                            <Spinner size="xl" />
                        </Box>
                    )}

                    {/* Ini untuk menampilkan Error jika ada */}
                    {error && <Text color="red.500">Error: {error}</Text>}

                    {/* Ini untuk menampilkan Data dalam Tabel jika tidak loading dan tidak ada error */}
                    {!loading && !error && (
                        <TableContainer>
                            <Table variant="striped" colorScheme="gray" margin="auto" >
                                <Thead backgroundColor="#002966">
                                    <Tr>
                                        <Th color="white" textAlign="center">ID</Th>
                                        <Th color="white" textAlign="center">Nama Penerima</Th>
                                        <Th color="white" textAlign="center">Hubungan Keluarga</Th>
                                        <Th color="white" textAlign="center">Produk</Th>
                                        <Th color="white" textAlign="center">No.SP</Th>
                                        <Th color="white" textAlign="center">Status</Th>
                                        <Th color="white" textAlign="center">Aksi</Th>
                                    </Tr>
                                </Thead>
                                <Tbody fontSize="sm" >
                                    {filteredData.length > 0 ? (
                                        filteredData.map((item) => (
                                            <Tr key={item.bp_id} >
                                                <Td >{item.pp_id}</Td>
                                                <Td>{item.pp_name}</Td>
                                                <Td>{item.hk_name}</Td>
                                                <Td>{item.mf_name}</Td>
                                                <Td>{item.pp_no_sp}</Td>
                                                <Td>{item.Status}</Td>
                                                <Td>
                                                    <Flex>
                                                        <Tooltip label={item.pp_is_deleted ? "Unhide" : "Hide"}>
                                                            <IconButton
                                                                aria-label={item.pp_is_deleted ? "Unhide" : "Hide"}
                                                                icon={item.pp_is_deleted ? <ViewIcon /> : <ViewOffIcon />}
                                                                colorScheme={item.pp_is_deleted ? "yellow" : "gray"}
                                                                variant="ghost"
                                                                onClick={() => handleHide(item.pp_id, item.pp_is_deleted)}
                                                            />
                                                        </Tooltip>
                                                    </Flex>
                                                </Td>
                                            </Tr>
                                        ))
                                    ) : (
                                        <Tr>
                                            <Td colSpan={8} textAlign="center">
                                                Tidak ada data yang ditemukan
                                            </Td>
                                        </Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Flex>

        </>
    );
}

