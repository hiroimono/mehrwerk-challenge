import { FunctionComponent } from "react"
import { Shop } from "../types"

/** Components */
import Loader from "../components/Loader"
import ShopCard from "../components/ShopCard"

/** Bootstrap */
import { Row, Col } from 'react-bootstrap';

type IHomeScreenProps = {
	loading: boolean,
	shops: Shop[] | undefined
}

const _HomeScreen: FunctionComponent<IHomeScreenProps> = ({ loading, shops }) => {
	return (
		<>
			{
				loading ? (
					<Loader />
				) : (
					<Row className="mt-3">
						{
							shops?.map((shop) => (
								<Col key={shop.id} xs={12} md={6} className="mb-4   ">
									<ShopCard shop={shop} />
								</Col>
							))
						}
					</Row>

				)
			}
		</>
	)
}

export default _HomeScreen