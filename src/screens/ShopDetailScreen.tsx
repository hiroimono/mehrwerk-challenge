import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

/** Types */
import { Shop } from "../types";

/** Components */
import Loader from "../components/Loader";

type Props = {}

const ShopDetailScreen = (props: Props) => {
    const { id: shopId } = useParams();

    const [shop, setShop] = useState<Shop | undefined>({} as Shop)
    const [loading, setLoading] = useState<boolean>(false)

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

        getShop();
    }, [shopId])

    return (
        <>
            {
                loading ? <Loader /> : (
                    <>
                        <div>Shop Id: {shopId}</div>
                        <div>Shop Name: {shop?.name}</div>
                    </>
                )
            }
        </>
    )
}

export default ShopDetailScreen