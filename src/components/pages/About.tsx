import Layout from '../layout';

const About = () => {

    return <div className="About">
        <h1 className="heading">About</h1>
        <div className="prompt">We are a generic ecommerce company!</div>
        <section>
            <label><strong>Who We Are</strong></label>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores facilis aliquid consectetur, similique vero quos, totam nihil cum harum blanditiis tempore ab quam quasi eum! Ullam reprehenderit impedit quasi voluptate facilis ipsa sit! Ad, odit cupiditate. Aliquid, deleniti. Ea velit minus at voluptatibus deleniti exercitationem ducimus laudantium quasi ipsa reiciendis!</div>
        </section>
        <section>
            <label><strong>What We Do</strong></label>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores facilis aliquid consectetur, similique vero quos, totam nihil cum harum blanditiis tempore ab quam quasi eum! Ullam reprehenderit impedit quasi voluptate facilis ipsa sit! Ad, odit cupiditate. Aliquid, deleniti. Ea velit minus at voluptatibus deleniti exercitationem ducimus laudantium quasi ipsa reiciendis!</div>
        </section>
        <section>
            <label><strong>Our Plans for the Future</strong></label>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores facilis aliquid consectetur, similique vero quos, totam nihil cum harum blanditiis tempore ab quam quasi eum! Ullam reprehenderit impedit quasi voluptate facilis ipsa sit! Ad, odit cupiditate. Aliquid, deleniti. Ea velit minus at voluptatibus deleniti exercitationem ducimus laudantium quasi ipsa reiciendis!</div>
        </section>
        
        <style>{`
            .About section {
                margin-bottom: 1rem;
            }
        `}</style>
    </div>
}

export default Layout(About);
