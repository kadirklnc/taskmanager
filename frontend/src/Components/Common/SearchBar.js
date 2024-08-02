import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './SearchBar.css';

const SearchBar = ({ placeholder, onSearch }) => {
    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const query = e.target.elements.search.value; // Get search value from form
        onSearch(query); // Call the onSearch callback with the query
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
            <Button variant="outline-success" type="submit" className="custom-search-button">
                Ara
            </Button>
        </Form>
    );
}

export default SearchBar;
