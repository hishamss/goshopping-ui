import Layout from '../layout';

const Contact = () => {

    return <div className="Contact">
        <h1 className="heading">Contact</h1>
        <div className="prompt">Feel free to reach out to our staff!</div>
        <ul>
            <li>
                <strong>email: </strong>
                <span>hr@goshopping.com</span>
            </li>
            <li>
                <strong>phone: </strong>
                <span>(XXX) XXX-XXXX</span>
            </li>
        </ul>

        <style>{`
            .Contact ul {
                flex-direction: column;
                width: 15rem;
                align-items: flex-start;
            }
        `}</style>
    </div>
}

export default Layout(Contact);
