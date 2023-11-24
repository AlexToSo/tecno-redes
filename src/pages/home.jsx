import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Home () {
  const navigate = useNavigate()
  const [isStudent, setIsStudent] = useState(false)
  const [group, setGroup] = useState(0)
  const [subGroup, setSubGroup] = useState('')

  const toggleForm = () => {
    setIsStudent(!isStudent)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    navigate(`/student?group=${group}&subgroup=${subGroup}`)
  }

  return (
    <>
      <h1>Bienvenidos a la actividad</h1>
      <Form>
        <h2>Elegid un rol</h2>
        <Form.Group controlId='formBasicRol'>
          <Button variant='primary' type='button' onClick={toggleForm}>
            Alumno
          </Button>
          <Button variant='primary' type='button' onClick={() => toast.error('Acceso denegado')}>
            Profesor
          </Button>
        </Form.Group>
        {isStudent &&
          (
            <>
              <h2>Escoged grupo y subgrupo</h2>
              <Form.Group controlId='formBasicGroup'>
                <Form.Label>Grupo</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Introduce número de grupo'
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  min={1}
                  max={5}
                />
              </Form.Group>
              <Form.Group controlId='formBasicSubGroup'>
                <Form.Label>Subgrupo</Form.Label>
                <Form.Select value={subGroup} onChange={(e) => setSubGroup(e.target.value)}>
                  <option>Selecciona subgrupo</option>
                  <option value='A'>Subgrupo A</option>
                  <option value='B'>Subgrupo B</option>
                </Form.Select>
              </Form.Group>
              <Button variant='primary' type='submit' onClick={handleFormSubmit}>
                Validar
              </Button>
            </>
          )}
      </Form>
    </>
  )
}

export default Home
