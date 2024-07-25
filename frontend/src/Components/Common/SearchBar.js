import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './SearchBar.css';

const SearchBar = ({ placeholder, onSearch }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const query = e.target.elements.search.value;
        onSearch(query);
    };

    return (

        <Form className="custom-search-form" onSubmit={handleSubmit}>
            <Form.Control
                type="search"
                name="search"
                placeholder={placeholder}
                className="custom-search-input"
                aria-label="Search"
            />
            <Button variant="outline-success" type="submit" className="custom-search-button">Ara</Button>
        </Form>


    );
}

export default SearchBar;
