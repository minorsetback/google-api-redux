import React, { useState, useEffect } from "react"
import { useBooksFetch } from "../../bus/books/hooks/useBooksFetch";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import qs from "qs";

function SearchBooks() {

    const [minIndex, setMinIndex] = useState(0)
    const [bookName, setBookName] = useState('');
    const [inputValue, setInputValue] = useState('');
    const { data, error } = useBooksFetch(bookName, minIndex);
    const [books, setBooks] = useState(data?.items);
    const [notSortedBooks, setNotSortedBooks] = useState(data?.items);
    const history = createBrowserHistory();

    useEffect(() => {
        setBooks(data.items)
        setNotSortedBooks(data.items)
        if (books) {
            setBooks([...books, ...data.items])
            setNotSortedBooks([...books, ...data.items])
        }
        // eslint-disable-next-line
    }, [data])

    useEffect(() => {
        const filterParams = history.location.search.substr(1);
        const filtersFromParams = qs.parse(filterParams);
        if (filtersFromParams.bookName) {
            setBookName(filtersFromParams.bookName);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        history.push(`?bookName=${bookName}`);
        // eslint-disable-next-line
    }, [bookName]);

    const Sort = (id, books) => {
        if (id === 1) {
            setBooks(notSortedBooks)
        }
        if (id === 2) {
            let sortedBooks = [...books];
            setBooks(sortedBooks.sort((a, b) => { return new Date(b.volumeInfo.publishedDate) - new Date(a.volumeInfo.publishedDate) }))
        }
    }

    const onKeyPress = (event) => {
        if (event.key === 'Enter') {
            setBookName(inputValue)
            setBooks([])
        }
    }

    if (error) {
        return (
            <Toast>
                <Toast.Body>{error}</Toast.Body>
            </Toast>
        )
    }

    return (
        <div>
            <div className="d-flex">
                <Form.Control
                    type="text"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    onChange={(event) => setInputValue(event.target.value)}
                    onKeyPress={onKeyPress}
                />
                <Button variant="outline-success" onClick={() => { setBookName(inputValue); setBooks([]) }}>Search</Button>
            </div>
            <p className="countBooks">Count books: {data?.totalItems}</p>
            <div className="d-flex">
                <Dropdown className="sort">
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Sort
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { Sort(1, books) }}>By relevance</Dropdown.Item>
                        <Dropdown.Item onClick={() => { Sort(2, books) }}>By date</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Filter
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { setBooks(notSortedBooks) }}>all</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setBooks(notSortedBooks.filter((item) => String(item.volumeInfo.categories) === 'Art')) }}>art</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setBooks(notSortedBooks.filter((item) => String(item.volumeInfo.categories) === 'Biography')) }}>biography</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setBooks(notSortedBooks.filter((item) => String(item.volumeInfo.categories) === 'Computers')) }}>computers</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setBooks(notSortedBooks.filter((item) => String(item.volumeInfo.categories) === 'History')) }}>history</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setBooks(notSortedBooks.filter((item) => String(item.volumeInfo.categories) === 'Medical')) }}>medical</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setBooks(notSortedBooks.filter((item) => String(item.volumeInfo.categories) === 'Poetry')) }}>poetry</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <Container>
                <Row>
                    {books?.map((item, index) => {
                        return (
                            <Col xs key={index}>
                                <Link to={`/${item.id}`}>
                                    <Card style={{ width: '18rem', height: '30rem' }} className='mt-4'>
                                        <Card.Img variant="top" style={{ width: '100%', height: '15rem' }} src={item.volumeInfo.imageLinks?.thumbnail} />
                                        <Card.Body>
                                            <Card.Title className="w-2">{item?.volumeInfo.title}</Card.Title>
                                            <Card.Text>Categories: {item?.volumeInfo.categories?.join(", ")}</Card.Text>
                                            <Card.Text>Authors: {item?.volumeInfo.authors?.join(", ")}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
            <Button className="loadMore" variant="outline-success" style={{ display: books !== undefined ? "block" : "none" }} onClick={() => { setMinIndex(minIndex + 30) }}>Load More</Button>
        </div >
    )
}

export default SearchBooks