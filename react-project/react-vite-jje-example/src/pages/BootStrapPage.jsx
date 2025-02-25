import React from 'react'
import Button from 'react-bootstrap/Button'

const BootStrapPage = () => {
  return (
    <>
      <Button variant='primary'>Primary</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='success'>Success</Button>
      <Button variant='warning'>Warning</Button>
      <Button variant='danger'>Danger</Button>
      <Button variant='info'>Info</Button>
      <Button variant='light'>Light</Button>
      <Button variant='dark'>Dark</Button>
      <Button variant='link'>Link</Button>
      <hr />
      <button type="button" className="btn btn-primary">Primary</button>
      <button type="button" className="btn btn-secondary">Secondary</button>
      <button type="button" className="btn btn-success">Success</button>
      <button type="button" className="btn btn-danger">Danger</button>
      <button type="button" className="btn btn-warning">Warning</button>
      <button type="button" className="btn btn-info">Info</button>
      <button type="button" className="btn btn-light">Light</button>
      <button type="button" className="btn btn-dark">Dark</button>
      <button type="button" className="btn btn-link">Link</button>
    </>
  );
};

export default BootStrapPage;
