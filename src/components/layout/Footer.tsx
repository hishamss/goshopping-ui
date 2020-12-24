import { colors } from '../../styles';

const Footer = () => {
    return <footer>
        <span>
            <ul>
                <li>Md Abul Kashem,</li>
                <li>Nick Barak,</li>
                <li>Zack Garner,</li>
                <li>Hisham Saymeh,</li>
                <li>Vincent Sevilla,</li>
                <li>Eric Terreri</li>
            </ul>
            <div>&copy; 2020 Revature</div>
        </span>

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
                background-color: ${colors.GRAYSCALE[1]};
                color: ${colors.GRAYSCALE[2]};
                text-align: center;
            }

            footer span {
                flex-direction: column;
                gap: .5rem;
            }
            
            footer ul {
                gap: .65rem;
            }

            footer div {
                user-select: none;
            }
        `}</style>
    </footer>
}

export default Footer;
