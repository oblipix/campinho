import '/src/styles/card.css';

const Header = () =>{
    return (
        <header className="header">
            <div className="header-container">
                <div className="header-image"></div>
        
                <div className="background-title"><h1 className="site-title">CINESTREAM</h1></div> 
                <div className="div-navbar">
                <nav className="navbar">
                    <a href="#top" className="nav-item">Início</a>

                    <div className="dropdown">
                        <button className="dropbtn">Filmes</button>
                        <div className="dropdown-content">
                            <a href="#terror" className="nav-item">Terror</a>
                            <a href="#comedia" className="nav-item">Comédia</a>
                            <a href="#comediaRomantica" className="nav-item">Com. Romântica</a>
                            <a href="#acao" className="nav-item">Ação</a>
                            <a href="#aventura" className="nav-item">Aventura</a>
                            <a href="#trending" className="nav-item">Tendências</a>
                            <a href="#drama" className="nav-item">Drama</a>
                        </div>
                    </div>
                    
            
                </nav>
                </div>
            </div>
      
        </header>
      
        
    );
}

export default Header;