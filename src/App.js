import './App.css';
import HomePage from "./pages/HomePage";
import {QueryClient, QueryClientProvider} from 'react-query'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <div className="container mx-auto">
                    <header className="App-header">
                        Room Utilization Dashboard
                    </header>
                    <Router>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                        </Routes>
                    </Router>
                </div>
            </div>
        </QueryClientProvider>
    );
}

export default App;
