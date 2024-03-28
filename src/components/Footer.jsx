import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {

    return <>
        <Navbar className="bg-body-tertiary mt-3">
            <Container>
                <Navbar.Brand>PokeDex</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        ©Theo BIALASIK
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
}

export default Footer;