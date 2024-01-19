import React from 'react'
import { Image} from 'react-bootstrap'
import OlisipoLogo from '../../../assets/images/olisipo/Olisipo_LogoWhite.svg';
const Logo = (props) => {

    return (
        <>
            <Image src={OlisipoLogo} alt="Olisipo Logo" className="logo-image mx-auto mt-auto" height={50} />
        </>
    )
}

export default Logo
