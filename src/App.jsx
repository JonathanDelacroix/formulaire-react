import './App.css'
import { Form, Button } from 'react-bootstrap'
import { useForm } from "react-hook-form"

function App() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      dueDate: "",
      priority: 'Basse',
      isCompleted: false,
    }
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Nom</Form.Label>
        <Form.Control {...register("name", {required: "Le nom est requis"} )} isInvalid={!!errors.name} type="text" name="name" placeholder="Enter votre nom"/>
        <Form.Control.Feedback type="invalid">
            {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="dueDate">
        <Form.Label>Date</Form.Label>
        <Form.Control {...register("dueDate", {required: "La date est requise"})} type="date" name="dueDate" isInvalid={!!errors.dueDate}/>
        <Form.Control.Feedback type="invalid">
            {errors.dueDate?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="priority">
        <Form.Label>Priorité</Form.Label>
        <Form.Select {...register("priority")} type="select" name="priority">
            <option value="Basse">Basse</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Elevée">Elevée</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="isCompleted">
        <Form.Label>Terminé ?</Form.Label>
        <Form.Check {...register("isCompleted")} type="checkbox" name="isCompleted" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Enregistrer
      </Button>
    </Form>
  )
}

export default App