import './App.css';
import HomePage from "./pages/HomePage";
import {QueryClient, QueryClientProvider} from 'react-query'

function App() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <div className="container mx-auto">
                    <header className="App-header">
                        Room Utilization Dashboard
                    </header>
                    <HomePage/>
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default App;
