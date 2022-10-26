import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

/** Types */
import { Shop, Token } from "../types";

// bootstrap
import { Row, Col, ListGroup, Card } from 'react-bootstrap';

/** Components */
import Loader from "../components/Loader";
import Message from "../components/Message";

type Props = {
    tokenComing: string | undefined
}

const tokenConfiguration = {
    "client_id": "bewerber",
    "client_secret": "hj52Ws4kF",
    "grant_type": "client_credentials"
}

const ShopDetailScreen = ({ tokenComing }: Props) => {
    const { id: shopId } = useParams();
    const navigate = useNavigate();

    const [shop, setShop] = useState<Shop | undefined>({} as Shop)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    useEffect(() => {
        if (!tokenComing) {
            const getToken = async () => {
                try {
                    const { data } = await axios.post<Token>('https://testapi.mehrwerk.de/v2/iam/oauth/token', tokenConfiguration)

                    if (data?.access_token)
                        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
                } catch (error: any) {
                    console.log('Error while getting Token. \nerror: ', error.message);
                    setError(true);
                    setErrorMessage(error.message);
                } finally {
                    setLoading(false);
                }
            }

            getToken();
        } else {
            axios.defaults.headers.common['Authorization'] = `Bearer ${tokenComing}`
        }
    }, [tokenComing])

    useEffect(() => {
        setLoading(true);
        const getShop = async () => {
            try {
                const { data } = await axios.get<Shop>(`https://testapi.mehrwerk.de/v3/cashback/shops/${shopId}`)
                if (data) {
                    setShop(data);
                }
            } catch (error: any) {
                console.log('Error while getting Shop. \nerror: ', error.message);
                setError(true);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }

        if (shopId) {
            getShop();
        } else {
            navigate('/');
        }
    }, [navigate, shopId])

    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    error ? (
                        <Message variant='danger'>{errorMessage}</Message>
                    ) : (
                        <>
                            <Link to='/' className='btn btn-dark'><i className="fas fa-angle-double-left mr-2"></i>back</Link>
                            <Row className='my-3'>

                                <Col md={7} lg={8}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item className='d-flex justify-content-between align-items-center px-0'>
                                            <a className="text-center w-100" href={shop?.link} target="_blank" rel="noreferrer">
                                                <img className="img-fluid" src={shop?.logo} alt='' />
                                            </a>
                                        </ListGroup.Item>

                                        <ListGroup.Item className='d-flex justify-content-between align-items-center px-0'>
                                            <h3>{shop?.name}</h3>
                                            {
                                                shop?.isFavorite ? (
                                                    <i className="d-inline-flex fas fa-star"></i>
                                                ) : (
                                                    <i className="d-inline-flex far fa-star"></i>
                                                )
                                            }
                                        </ListGroup.Item>

                                        <ListGroup.Item className='px-0'>
                                            Description: {
                                                shop && shop.description && shop.description.length < 140 ? shop?.description : shop?.description?.slice(0, 140) + '...'
                                            }
                                        </ListGroup.Item>

                                        <ListGroup.Item className='px-0'>
                                            Categories: {
                                                shop?.categories?.map(cat => (
                                                    <span key={cat.id} className="badge badge-pill badge-success mr-1">{cat.name}</span>
                                                ))
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>

                                <Col md={5} lg={4} className="my-3">
                                    <Card>
                                        <Card.Header className="p-2">
                                            Cashback Rates:
                                        </Card.Header>

                                        <Card.Body className="p-2">
                                            <ListGroup variant='flush'>
                                                {
                                                    shop?.cashbackRates?.length ? (
                                                        shop?.cashbackRates?.map((rate, i) => (
                                                            <ListGroup.Item key={i} className='px-0 py-1'>
                                                                <Row>
                                                                    <Col>
                                                                        {rate.description}: {rate.amount}{rate.type}
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        ))
                                                    ) : (
                                                        <p>No Cashback</p>
                                                    )
                                                }
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    )
                )
            }
        </ >
    )
}

export default ShopDetailScreen