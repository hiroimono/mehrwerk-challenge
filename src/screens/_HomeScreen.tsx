import { FunctionComponent } from "react"
import { Shop } from "../types"

type IHomeScreenProps = {
    loading: boolean,
    shops: Shop[] | undefined
}

const _HomeScreen: FunctionComponent<IHomeScreenProps> = ({ loading, shops }) => {
    return (
        <div className='container'>
            {
                loading ? (
                    <h1>Loading</h1>
                ) : (
                    <ul>
                        {
                            shops?.map((item) => (
                                <li key={item.id}>{item.name}</li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    )
}

export default _HomeScreen