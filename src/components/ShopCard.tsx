/** Bootstrap */
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/** Types */
import { Shop } from '../types';

type IShopCardProps = {
    shop: Shop
}

const ShopCard = ({ shop }: IShopCardProps) => {
    const navigate = useNavigate();

    return (
        <Card className="shopCard">
            <Card.Header className="shopCardHeader d-flex justify-content-between align-items-center">
                <h4 className="d-inline-flex">
                    {shop.name}
                </h4>

                {
                    shop.isFavorite ? (
                        <i className="d-inline-flex fas fa-star"></i>
                    ) : (
                        <i className="d-inline-flex far fa-star"></i>
                    )
                }
            </Card.Header>

            <Card.Body className="shopCardBody">
                <a className="text-center" href={shop.link} target="_blank" rel="noreferrer">
                    <img className="img-fluid shopCardImg" src={shop.logo} alt='' />
                </a>

                <div className="shopCardText py-3">
                    {shop.description}
                </div>
            </Card.Body>

            <Card.Footer className="shopCardFooter p-2">
                <Button className="btn btn-block btn-light btn-outline-warning text-center" onClick={() => navigate(`/shops/${shop.id}`)}>
                    Details
                </Button>
            </Card.Footer>
        </Card>
    )
}

export default ShopCard