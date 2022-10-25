import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

/** Types */
import { Shop, Token } from "../types";

// bootstrap
import { Row, Col, ListGroup, Card, Container } from 'react-bootstrap';

/** Components */
import Loader from "../components/Loader";

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

    useEffect(() => {
        if (!tokenComing) {
            const getToken = async () => {
                try {
                    const { data } = await axios.post<Token>('https://testapi.mehrwerk.de/v2/iam/oauth/token', tokenConfiguration)

                    if (data?.access_token)
                        axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
                } catch (error) {
                    console.log('Error while getting Token. \nerror: ', error);
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
            } catch (error) {
                console.log('Error while getting Shop. \nerror: ', error);
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
        <Container>
            {loading ?
                <Loader /> : (
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

                            {/* <Col md={5} lg={3} className="my-3">
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>{t('price')}: </Col>
                                                <Col><strong>{currency(product?.price)}</strong></Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status: </Col>
                                                <Col>{product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col className="d-flex align-items-center">{t('quantity')}: </Col>
                                                <Col>
                                                    {product?.countInStock > 0 && (
                                                        <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                            {[...Array(product.countInStock).keys()].map((num) =>
                                                                <option key={num}>{num + 1}</option>
                                                            )}
                                                        </Form.Control>
                                                    )}</Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                {isInCart ? (
                                                    <Button type='button' className="btn btn-block"
                                                        disabled={product?.countInStock <= 0 ? true : false}
                                                        onClick={removeFromCartHandler}>
                                                        <i className="fas fa-times mr-2"></i>
                                                        {t('remove-from-cart')}
                                                    </Button>
                                                ) : (
                                                    <Button type='button' className="btn btn-block"
                                                        disabled={product?.countInStock <= 0 ? true : false}
                                                        onClick={addToCartHandler}>
                                                        <i className="fas fa-plus mr-2"></i>
                                                        {t('add-to-cart')}
                                                    </Button>
                                                )}
                                            </Row>
                                            <Row>
                                                <Link to='/cart' className='btn btn-info btn-block mt-2'>
                                                    <i className="fas fa-shopping-cart mr-2"></i>
                                                    {t('go-to-cart')}
                                                </Link>
                                            </Row>
                                            {
                                                user?.isAdmin && (
                                                    <Row>
                                                        <Link to={`/admin/productedit/${match.params.id}/edit`} className='btn btn-warning btn-block mt-2'>
                                                            <i className="fas fa-cut mr-2"></i>
                                                            {t('edit-product')}
                                                        </Link>
                                                    </Row>
                                                )
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col> */}
                        </Row>
                    </>
                )
            }
        </Container>
    )
}

export default ShopDetailScreen