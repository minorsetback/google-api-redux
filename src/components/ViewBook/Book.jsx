import { useParams } from "react-router-dom";
import { useBooksFetch } from "../../bus/books/hooks/useBooksFetch";
import Card from 'react-bootstrap/Card';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
function Book() {
    let { id } = useParams();
    const { data, error } = useBooksFetch(null, null, String(id));
    const navigate = useNavigate();

    if (error) {
        return (
            <Toast>
                <Toast.Body>{error}</Toast.Body>
            </Toast>
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
                    <Card.Text>
                        {data.volumeInfo?.description}
                    </Card.Text>
                </Card.Body>
            </Card>

        </>
    )
}

export default Book