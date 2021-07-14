import './App.css';
import Main from './components/Main/Main';

function App() {
    return (
        <div className="App">
            <header className="App__header">
                header
            </header>

            <nav className="App__navbar">
                sidebar
            </nav>

            <main className="App__main">
                <Main/>
            </main>

            <footer className="App__footer">
                footer
            </footer>
        </div>
    );
}

export default App;
