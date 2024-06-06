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

3. Review [**Bootstrap**](../../styles/bootstrap5.md)
4. Review [React-Bootstrap documentation](https://react-bootstrap.github.io/)
5. Should using  [React-bootstrap icons](https://github.com/ismamz/react-bootstrap-icons)

### Color modes

- Add attribute below to html (apply all) or highest level element of component
  - `data-bs-theme="light"`
  - `data-bs-theme="dark"`

## Layout

### Grid

```jsx
// fluid for fit all horizontal
<Container fluid>
  <Row>
    {/* Auto fit */}
    <Col></Col>
    <Col></Col>
  </Row>
  {/* In breakpoint xs, Row contains only 2 cols */}
  <Row xs={2}>
    {/* In breakpoint xs, Col width is 3/12 */}
    <Col sm={3}></Col>
    <Col></Col>
  </Row>
</Container>
```

### Stack

```jsx
// default is vertical
<Stack direction="horizontal" gap={3}>
  <div className="p-2">First item</div>
  <div className="p-2">Second item</div>
  <div className="p-2">Third item</div>
</Stack>
```

## Components

### Forms

```jsx
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

- **Form**
  - **Group**: group small pieces of form
    - `controlId`: auto set to label `htmlFor` & input `id`
    - `as`: use for grid system `as={Row}`
  - **Text**: static
    - `muted`: add `text-muted` class
  - **Label**
    - `column`: apply grid system, use with breakpoint like `xs={3}`
  - **Control**: `<input {...formControlProps} />`
    - `plaintext`: render as text (use with `readOnly`)
    - `as='textarea'`
    - `isValid` | `isInvalid`
    - **Feedback**
      - `type`: valid, invalid
      - `tooltip`
  - Select: `<select></select>`
  - Checked: checkbox | radio buttons
    - `type`: checkbox, radio, switch (same as check)
    - `id`: auto setup label's `htmlFor`
    - `label`: display text
    - `inline`: display same row
    - `feedback`: text show after validate
    - `feedbackType`: valid | invalid
    - `feedbackTooltip`
    - Input, Label
  - Switch
  - Range: line drag control
  - Floating

### InputGroup

```jsx
<InputGroup className="mb-3">
  <SplitButton
    variant="outline-secondary"
    title="Action"
    id="segmented-button-dropdown-1"
  >
    <Dropdown.Item href="#">Action</Dropdown.Item>
    <Dropdown.Item href="#">Another action</Dropdown.Item>
    <Dropdown.Item href="#">Something else here</Dropdown.Item>
    <Dropdown.Divider />
    <Dropdown.Item href="#">Separated link</Dropdown.Item>
  </SplitButton>
  <Form.Control aria-label="Text input with dropdown button" />
</InputGroup>
```

- InputGroup
  - `hasValidation`
  - Text, Checkbox, Radio

### Accordion

```jsx
<Accordion defaultActiveKey={['0']} alwaysOpen>
  <Accordion.Item eventKey="0">
    <Accordion.Header>Accordion Item #1</Accordion.Header>
    <Accordion.Body>
      Content 1
    </Accordion.Body>
  </Accordion.Item>
  <Accordion.Item eventKey="1">
    <Accordion.Header>Accordion Item #2</Accordion.Header>
    <Accordion.Body>
      Content 2
    </Accordion.Body>
  </Accordion.Item>
</Accordion>
```

- Accordion
  - `flush`: square corner
  - `activeKey`: string | string[]
  - `defaultActiveKey`: string | string[]
  - `onSelect`: (currentEventKey, event) => void
  - `alwaysOpen`: open multiple
  - Item
    - `eventKey`
    - Header: `onClick`
    - Body: `onEnter | onEntering | onEntered`, `onExit | onExiting | onExited`
  - Button
  - Collapse
- AccordionContext: { activeEventKey }
- `useAccordionButton(currentEventKey, onClick)`: custom header

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

## React bootstrap icons

| Name         | Type             | Description                                    |
| ------------ | ---------------- | ---------------------------------------------- |
| `color?`     | string           | color of the icon                              |
| `size?`      | string \| number | size of the icon (`width` and `height`)        |
| `title?`     | string           | provides an accessible, short-text description |
| `className?` | string           | `bi bi-{icon-name}` and add your own classes   |
