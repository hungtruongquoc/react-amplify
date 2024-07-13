import {useQuery} from 'react-query';
import api from '../api/data';


export default function HomePage() {
    // Fetch all items
    const { data: items, isLoading, error } = useQuery('items', api.getRoomUtilization);

    return <p>Home page works</p>
}
