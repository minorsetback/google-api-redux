import { useParams } from "react-router-dom";
import { useBooks } from "../../bus/books/hooks/useBooks";
import Card from 'react-bootstrap/Card';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import parcer from "html-react-parser"

function Book() {
    let { id } = useParams();
    const { data, error, isFetching } = useBooks(null, null, String(id));
    const navigate = useNavigate();

    if (error) {
        return (
            <Toast>
                <Toast.Body>{error}</Toast.Body>
            </Toast>
        )
    }

    if (isFetching) {
        return (
            <Spinner animation="border" role="status" className="loader">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    return (
        <>
            <Button variant="outline-success" className='mb-2' onClick={() => navigate(-1)}>Go back</Button>
            <Card>
                <Card.Img variant="top" className="w-25 mt-2 m-auto" src={data.volumeInfo?.imageLinks.thumbnail} />
                <Card.Body>
                    <Card.Title className="w-2">{data.volumeInfo?.title}</Card.Title>
                    <Card.Text>Categories: {data.volumeInfo?.categories}</Card.Text>
                    <Card.Text>Authors: {data.volumeInfo?.authors?.join(", ")}</Card.Text>
                    <Card.Text as='span'>
                        {parcer(String(data.volumeInfo?.description))}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Book