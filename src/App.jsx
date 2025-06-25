import { useState } from 'react'
import './App.css'
import { Form, Button } from 'react-bootstrap'

function App() {

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    priority: 'Basse',
    isCompleted: false,
  });

  const handleChange = (e) => {
    setFormData((prevData) => ({
    ...prevData,
    [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulaire soumis:', formData);
  };

  return (
    <Form onSubmit={handleSubmit}>

      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Nom</Form.Label>
        <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter votre nom" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPriority">
        <Form.Label>Priorité</Form.Label>
        <Form.Select type="select" name="priority" value={formData.priority} onChange={handleChange}>
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Elevée</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formIsCompleted">
        <Form.Label>Terminé ?</Form.Label>
        <Form.Check type="checkbox" name="isCompleted" checked={formData.isCompleted} onChange={handleChange} />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enregistrer
      </Button>
    </Form>
  )
}

export default App
