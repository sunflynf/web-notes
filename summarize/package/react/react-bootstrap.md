# React-Bootstrap

## Setup

1. **Install react-bootstrap and Bootstrap:**

   ```bash
   npm install react-bootstrap bootstrap
   ```

2. **Import Bootstrap CSS in your `index.js` or `index.tsx`:**

   ```javascript
   import 'bootstrap/dist/css/bootstrap.min.css';
   ```

## Components

### Alerts

```jsx
import { Alert } from 'react-bootstrap';

<Alert variant="primary">This is a primary alert—check it out!</Alert>
<Alert variant="danger">This is a danger alert—check it out!</Alert>
```

### Buttons

```jsx
import { Button } from 'react-bootstrap';

<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>
<Button variant="light">Light</Button>
<Button variant="dark">Dark</Button>
<Button variant="link">Link</Button>
```

### Button Groups

```jsx
import { ButtonGroup } from 'react-bootstrap';

<ButtonGroup>
  <Button>Left</Button>
  <Button>Middle</Button>
  <Button>Right</Button>
</ButtonGroup>
```

### Forms

```jsx
import { Form, Button } from 'react-bootstrap';

<Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>

  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>

  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
```

### Grid System

```jsx
import { Container, Row, Col } from 'react-bootstrap';

<Container>
  <Row>
    <Col>1 of 2</Col>
    <Col>2 of 2</Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </Row>
</Container>
```

### Modals

```jsx
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';

function MyModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
```

### Navbars

```jsx
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#link">Link</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>
```

### Cards

```jsx
import { Card, Button } from 'react-bootstrap';

<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
```

### Tables

```jsx
import { Table } from 'react-bootstrap';

<Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Username</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <td>3</td>
      <td colSpan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</Table>
```

## Additional Tips

1. **Customizing Themes:**
   You can customize the Bootstrap theme by overriding the default CSS or using Bootstrap’s Sass variables.

2. **Using Icons:**
   For Bootstrap icons, you can install `react-bootstrap-icons`:

   ```bash
   npm install react-bootstrap-icons
   ```

   Then import and use them:

   ```jsx
   import { ArrowRight } from 'react-bootstrap-icons';

   <ArrowRight />
   ```

3. **Using Utilities:**
   Utilize Bootstrap utility classes (e.g., `text-center`, `mb-3`) for quick styling.

More detailed information and advanced use cases: [React-Bootstrap documentation](https://react-bootstrap.github.io/)
