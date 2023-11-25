import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'
import { db } from '../firebase'
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

function Student () {
  const navigate = useNavigate()
  const [code, setCode] = useState('')
  const [codeToCheck, setCodeToCheck] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const urlParams = new URLSearchParams(window.location.search)
  const group = urlParams.get('group')
  const subGroup = urlParams.get('subgroup')

  const handleSaveCode = async (event) => {
    event.preventDefault()

    try {
      if (code.length === 0) throw new Error('Debes introducir un código')
      else if (subGroup === 'A' && !/^#[0-9A-Fa-f]{6}$/.test(code)) throw new Error('El código debe corresponder a un color')
      else if (subGroup === 'B' && !/^[A-Za-z]{3}$/.test(code)) throw new Error('El código debe tener 3 letras A-Z o a-z')

      await updateDoc(doc(db, 'codes', `${group}${subGroup}`), { code })

      toast.success('Código guardado correctamente')
      setCurrentStep((previous) => previous + 1)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleCheckCode = async (event) => {
    event.preventDefault()

    const teamSubGroup = subGroup === 'A' ? 'B' : 'A'

    try {
      const teamCode = (await getDoc(doc(db, 'codes', `${group}${teamSubGroup}`))).data().code
      if (teamCode === codeToCheck) {
        setCurrentStep((previous) => previous + 1)
        toast.success('🎉 ¡¡¡Código correcto!!! 🎉')
      } else toast.error('❌ Código incorrecto ❌')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <h1>Equipo {group}-{subGroup}</h1>
      <Form>
        {(currentStep === 1) && (subGroup === 'A') &&
        (
          <>
            <h2>Elegid un color</h2>
            <Form.Group controlId='formBasicPickColor'>
              <Form.Label>Color</Form.Label>
              <Form.Control
                type='color'
                placeholder='Selecciona un color'
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button variant='primary' type='submit' onClick={handleSaveCode}>
                Validar
              </Button>
            </Form.Group>
          </>
        )}
        {(currentStep === 1) && (subGroup === 'B') &&
        (
          <>
            <h2>Elegid una palabra de 3 letras</h2>
            <Form.Group controlId='formBasicPickText'>
              <Form.Label>Palabra</Form.Label>
              <Form.Control
                type='text'
                placeholder='P.ej. Ave'
                value={code}
                pattern='[A-Za-z]{3}'
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <Button variant='primary' type='submit' onClick={handleSaveCode}>
                Validar
              </Button>
            </Form.Group>
          </>
        )}
        {(currentStep === 2) && (subGroup === 'A') &&
        (
          <>
            <h2>Adivinad la palabra de 3 letras de vuestros compañeros</h2>
            <Form.Group controlId='formBasicPickText'>
              <Form.Label>Palabra</Form.Label>
              <Form.Control
                type='text'
                placeholder='P.ej. Ave'
                value={codeToCheck}
                pattern='[A-Za-z]{3}'
                onChange={(e) => setCodeToCheck(e.target.value)}
                required
              />
              <Button variant='primary' type='submit' onClick={handleCheckCode}>
                Comprobar
              </Button>
            </Form.Group>
          </>
        )}
        {(currentStep === 2) && (subGroup === 'B') &&
        (
          <>
            <h2>Adivinad el color de vuestros compañeros</h2>
            <Form.Group controlId='formBasicPickColor'>
              <Form.Label>Color</Form.Label>
              <Form.Control
                type='color'
                placeholder='Selecciona un color'
                value={codeToCheck}
                onChange={(e) => setCodeToCheck(e.target.value)}
              />
              <Button variant='primary' type='submit' onClick={handleCheckCode}>
                Comprobar
              </Button>
            </Form.Group>
          </>
        )}
        {currentStep === 3 &&
        (
          <>
            <h2>🎊🎊 ¡¡¡Enhorabuena!!! 🎊🎊</h2>
            <p>¡¡¡Habéis completado la actividad!!!</p>
          </>
        )}
        {currentStep > 1
          ? (
            <Button variant={null} onClick={() => setCurrentStep((previous) => previous - 1)}>⬅️</Button>
            )
          : (
            <Button variant={null} onClick={() => navigate('/')}>⬅️</Button>
            )}
      </Form>
    </>
  )
}

export default Student
