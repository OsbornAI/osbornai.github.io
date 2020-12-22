import About from '../pages/about';
import Services from '../pages/services';
import Book from '../pages/book';
import Portfolio from '../pages/portfolio';

const Body = () => {
    return (
        <div className="Body">

            <div class="container">
                <About />
                <Services />
                <Book />
                <Portfolio />
            </div>

        </div>
    );
}

export default Body;