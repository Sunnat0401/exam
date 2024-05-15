import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, message } from 'antd';
import './HomePage.css';

const HomePage = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNzkwYzBiNzktMWFkNy00NGM1LWE5ODMtMzUzMzMzNjZmOGU5IiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNTc4MDIzNywiZXhwIjoxNzQ3MzE2MjM3fQ.Kzph6DOcT5FBD2BwELgGecWSo_AA_qacyeuVfPHTbjk';
    const [category, setCategory] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');

    const getData = () => {
        axios
            .get(`https://api.dezinfeksiyatashkent.uz/api/categories`)
            .then(response => {
                setCategory(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching categories data:", error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const createCategory = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('desc', desc);

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios({
            url: 'https://api.dezinfeksiyatashkent.uz/api/categories',
            method: 'POST',
            data: formData,
            headers: headers,
        })
        .then((res) => {
            message.success("Category created successfully");
            getData();
            handleCancel(); // Close the modal after successful submission
        })
        .catch((err) => {
            message.error("Error creating category");
            console.log(err);
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        if (name.trim() !== '' && desc.trim() !== '') {
            createCategory();
        } else {
            message.warning("Name and Description cannot be empty");
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const deleteCategory = (id) => {
        Modal.confirm({
            title: "Delete Category",
            content: "Are you sure you want to delete this category?",
            maskClosable: true, // Allow closing by clicking outside the modal
            onOk() {
                const headers = {
                    Authorization: `Bearer ${token}`,
                };
                axios({
                    url: `https://api.dezinfeksiyatashkent.uz/api/categories/${id}`,
                    method: 'DELETE',
                    headers: headers,
                }).then((res) => {
                    message.success(`Category deleted successfully`);
                    getData(); 
                }).catch((err) => {
                    console.error("Error deleting category", err);
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    
    return (
        <div>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal title="Create Category" visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <form className='createForm' onSubmit={createCategory}>
                    <input className='createInput' type="text" value={name} id='name' onChange={(e) => setName(e?.target?.value)} placeholder="Name (English)" />
                    <input className='createInput' type="text" value={desc} id='desc' onChange={(e) => setDesc(e?.target?.value)} placeholder="Name (Russian)" />
                </form>
            </Modal>

            {category.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>
                                    <button onClick={() => deleteCategory(item?.id)}>Delete</button>
                                    <button>Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default HomePage;
