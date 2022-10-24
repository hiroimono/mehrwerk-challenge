import { useEffect, useState } from "react";
// import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

/** Components */
import Footer from '../components/Footer';
import Header from '../components/Header';
import HomeScreen from '../screens/_HomeScreen';

/** Types */
import { Shop, Shops, Token } from "../types";

/** Styles */
import './App.css'

axios.defaults.headers.common['X-API-KEY'] = 'lQeUjTylHDCxqfISyZ05C7m1rov3hEZLYAqO42zs7h1fPBL2RF'
const tokenConfiguration = {
    "client_id": "bewerber",
    "client_secret": "hj52Ws4kF",
    "grant_type": "client_credentials"
}

function App() {
    const [token, setToken] = useState<string | undefined>(undefined)
    const [shops, setShops] = useState<Shop[] | undefined>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        setLoading(true);
        const getToken = async () => {
            try {
                const { data } = await axios.post<Token>('https://testapi.mehrwerk.de/v2/iam/oauth/token', tokenConfiguration)

                if (data?.access_token)
                    setToken(data.access_token);

                axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
            } catch (error) {
                console.log('Error while getting Token. \nerror: ', error);
            }
        }

        getToken();
        setLoading(false);
    }, [])

    useEffect(() => {
        setLoading(true);
        const getShops = async () => {
            try {
                const { data } = await axios.get<Shops>('https://testapi.mehrwerk.de/v3/cashback/shops')
                if (data) {
                    setShops(data.items);
                }
            } catch (error) {
                console.log('Error while getting Shops. \nerror: ', error);
            }
            setLoading(false);
        }

        if (token) {
            getShops();
        }
    }, [token])


    return (
        <main id='main'>
            <Header />
            <HomeScreen loading={loading} shops={shops} />
            <Footer />
        </main>
    );
}

export default App;