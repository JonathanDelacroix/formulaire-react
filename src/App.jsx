import './App.css'
import { Form, Button } from 'react-bootstrap'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

function App() {
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  const schema = yup.object().shape({
    name: yup.string().required("Le nom est requis").min(8, "Minimum 8 caractères").max(15, "Maximum 15 caractères"),
    priority: yup.string().oneOf(["low", "medium", "high"]),
    dueDate: yup.string().required("La date est requise").matches(dateRegex, "Format invalide. Ex: JJ/mm/YYYY").test("isValidDate", "La date ne doit pas antérieure à aujourd’hui", (value) => {
        const [day, month, year] = value.split("/").map(Number);
        const inputDate = new Date(year, month - 1, day);
        return inputDate >= new Date;
    }),
    isCompleted: yup.boolean()
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      dueDate: "",
      priority: 'low',
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
        <Form.Control {...register("name")} isInvalid={!!errors.name} type="text" name="name" placeholder="Enter votre nom"/>
        <Form.Control.Feedback type="invalid">
            {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="dueDate">
        <Form.Label>Date</Form.Label>
        <Form.Control {...register("dueDate")} type="text" name="dueDate" isInvalid={!!errors.dueDate}/>
        <Form.Control.Feedback type="invalid">
            {errors.dueDate?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="priority">
        <Form.Label>Priorité</Form.Label>
        <Form.Select {...register("priority")} type="select" name="priority">
            <option value="low">Basse</option>
            <option value="medium">Moyenne</option>
            <option value="high">Elevée</option>
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