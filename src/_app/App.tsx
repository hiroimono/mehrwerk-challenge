import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

/** Components */
import Footer from '../components/Footer';
import Header from '../components/Header';
import HomeScreen from '../screens/_HomeScreen';
import ShopDetailScreen from "../screens/ShopDetailScreen";
import Message from "../components/Message";

/** Types */
import { Shop, Shops, Token } from "../types";

/** Bootstrap */
import { Container } from 'react-bootstrap';

/** Local Storage */
import { setLocal, getLocal, removeLocal } from '../localStorage';

/** Secrets */
import secrets from '../.secrets.js'

axios.defaults.headers.common['X-API-KEY'] = secrets.X_API_KEY
const tokenConfiguration = {
    "client_id": secrets.CLIENT_ID,
    "client_secret": secrets.CLIENT_SECRET,
    "grant_type": secrets.GRANT_TYPE
}

function App() {
    const [token, setToken] = useState<string | null | undefined>(null)
    const [shops, setShops] = useState<Shop[] | undefined>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')

    const getToken = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post<Token>('https://testapi.mehrwerk.de/v2/iam/oauth/token', tokenConfiguration)

            if (data?.access_token) {
                setToken(data.access_token);
                setLocal('token', data.access_token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
            } else {
                throw new Error('Token could not get!')
            }

        } catch (error: any) {
            console.log('Error while getting Token. \nerror: ', error.message);
            setError(true);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    const getShops = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get<Shops>('https://testapi.mehrwerk.de/v3/cashback/shops')
            if (data) {
                setShops(data.items);
            }
        } catch (error: any) {
            console.log('Error while getting Shops. \nerror: ', error);

            if (error.code === '401') {
                setToken(null)
                removeLocal('token')
            };
            setError(true);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const tokenLocal = getLocal('token')

        if (!tokenLocal) {
            getToken();
        } else {
            setToken(tokenLocal);
            axios.defaults.headers.common['Authorization'] = `Bearer ${tokenLocal}`
        }
    }, [])

    useEffect(() => {
        if (!token) {
            getToken();
        } else {
            getShops();
        }
    }, [token])


    return (
        <main id='main'>
            <Header />
            <Container>
                {
                    error ? (
                        <Message variant='danger'>{errorMessage}</Message>
                    ) : (
                        <>
                            <Router>
                                <Routes>
                                    <Route path="/" element={<HomeScreen loading={loading} shops={shops} />} />
                                    <Route path="/shops/:id" element={<ShopDetailScreen tokenComing={token} />} />
                                </Routes>
                            </Router>
                        </>
                    )
                }
            </Container>
            <Footer />
        </main>
    );
}

export default App;