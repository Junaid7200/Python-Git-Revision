import React, { useState, useEffect } from 'react';


// in typescript, we need to define the types
interface Client {
    id: number;
    name: string;
    email: string;
    phone?: string;
    company?: string;
}

interface FormData {    // FormData is basically a big data type that we can give to our state later, same goes for Client
    name: string;
    email: string;
    phone?: string;
    company?: string;
}



const ClientPage: React.FC = () => {
    // logic

// in the useState hooks, we gotta give the type of data we are going to store in the state in typescript
    const [data, setData] = useState<FormData>( {
        name: '',
        email: '',
        phone: '',
        company: '',
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [clients, setClients] = useState<Client[]>([]);


// simply getting data from django, this is a GET request.
// but where is the request body etc? 
// we don't need it for GET requests, only for POST requests
// so we can use the fetch API to get data from the django server
useEffect(() => {
    fetch('http://localhost:8000/api/clients')
        .then(response => response.json())
        .then(data => {
            setClients(data);
            setLoading(false);
        })
}, []);


const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
        ...data,
        [e.target.name]: e.target.value
    })
};


if (loading) {
    return <p>Loading Clients...</p>;
}

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch('http://localhost:8000/api/clients/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data), 
        // the method is POST because we are sending data to the server
        // the headers are set to application/json because we are sending JSON data
        // the body is the data that we are sending to the server
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then((newClient: Client) => {
            setClients([...clients, newClient]);
            setData({name: '',email: '',phone: '',company: ''});
        })
        .catch((error: Error) => {
            alert(`There was a problem with the fetch operation: ${error.message}`);
            console.error(`There was a problem with the fetch operation: ${error}`);
        })
    }


    // display
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1>Clients</h1>
            <hr/>
            <h2>List of Clients</h2>
            <ul>
                {clients.map(client => (
                    <li key={client.id}>{client.name} - {client.email}</li>
                ))}
            </ul>

            <h2 className="text-2xl font-bold">Add New Client</h2>
            <form onSubmit={handleSubmit}>
                <input name='name' value={data.name} type="text" className="name-field" placeholder="Name" onChange={handleChange} required/>
                <input name='email' value={data.email} type="email" className="email-field" placeholder="Email" onChange={handleChange} required/>
                <input name='phone' value={data.phone} type="text" className="phone-field" placeholder="Phone Number" onChange={handleChange} />
                <input name='company' value={data.company} type="text" className="company-name" placeholder="Company Name" onChange={handleChange} />
                <button className="submit-button p-2 rounded bg-blue-500" type="submit">Submit</button>
            </form>
        </div>
    )
}


export default ClientPage;