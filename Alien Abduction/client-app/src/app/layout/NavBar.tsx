import react from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm: () => void;
}

export  default function NavBar({openForm}: Props) {
    return(
        <Menu>
            <Container>
                <Menu.Item header>
                    <img src="/assets/kahoot.png" style={{width:'100px'}} alt="logo"/>
                </Menu.Item>

                <Menu.Item>
                <Button color='violet' content='Quiz'/>
                </Menu.Item>
                
                <Menu.Item position='right'>
                    <Button onClick={openForm} positive content='Create Quiz' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}