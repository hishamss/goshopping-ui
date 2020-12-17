const Footer = () => {
    return (<>
        <footer>
            <span>
                <ul>
                    <li>Md Abul Kashem,</li>
                    <li>Nick Barak,</li>
                    <li>Zack Garner,</li>
                    <li>Hisham Saymeh,</li>
                    <li>Vincent Sevilla,</li>
                    <li>Eric Terrari</li>
                </ul>
                <div>&copy; 2020 Revature</div>
            </span>
        </footer>

        <style>{`
            footer, footer span {
                display: flex;
            }

            footer {
                justify-content: center;
                align-items: center;
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 8rem;
                background-color: #333;
                color: white;
                text-align: center;
            }

            footer span {
                flex-direction: column;
                gap: .5rem;
            }
            
            footer ul {
                gap: .65rem;
            }
        `}</style>
    </>)
}

export default Footer;
