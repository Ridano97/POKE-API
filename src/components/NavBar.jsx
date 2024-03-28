import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import GenerationService from "../Services/GenerationService";
import TypeService from "../Services/TypeService";
import PokemonsService from "../Services/PokemonsService";
import VersionService from "../Services/VersionService";

const NavBar = () => {
  // États -> States
  const [generations, setGenerations] = useState([]);
  const [types, setTypes] = useState([]);
  const [versions, setVersions] = useState([]);

  // Comportements -> Les functions
  const getGeneration = async () => {
    const response = await GenerationService.fetchGeneration();
    setGenerations(response.data.results);
  };
  const getType = async () => {
    const response = await TypeService.fetchTypeByURL(
      "https://pokeapi.co/api/v2/type"
    );
    setTypes(response.data.results);
  };

  const getVersion = async () => {
    const response = await VersionService.fetchVersions(
      "https://pokeapi.co/api/v2/version-group/"
    );
    setVersions(response.data.results);
  };

  useEffect(() => {
    getGeneration();
    getType();
    getVersion();
  }, []);

  //Affichage -> return
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
        <Container>
          <Link to={"/"}>
            <Navbar.Brand>Accueil </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to={"/pokemons"}>Pokemons</Link>
              </Nav.Link>
              <NavDropdown title="Générations" id="basic-nav-dropdown">
                {generations.map((generation) => {
                  return (
                    <NavDropdown.Item
                      href={
                        "/generations/" +
                        generation.url.slice(36).replaceAll("/", "")
                      }
                    >
                      {generation.name[0].toUpperCase() +
                        generation.name.slice(1)}
                      {/* <Link to={"/generations/"+generation.url.slice(36).replaceAll("/", "")} replace >{generation.name[0].toUpperCase() + generation.name.slice(1)}</Link> */}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <NavDropdown title="Types" id="basic-nav-dropdown-types">
                {types.map((type) => {
                  return (
                    <NavDropdown.Item
                      href={"/types/" + type.url.slice(30).replaceAll("/", "")}
                    >
                      {type.name[0].toUpperCase() + type.name.slice(1)}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
              <NavDropdown title="Versions" id="basic-nav-dropdown-versions">
                {versions.map((version) => {
                  return (
                    <NavDropdown.Item
                      href={
                        "/versions/" + version.url.slice(40).replaceAll("/", "")
                      }
                    >
                      {version.name[0].toUpperCase() + version.name.slice(1)}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
