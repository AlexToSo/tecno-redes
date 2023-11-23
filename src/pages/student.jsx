import { useEffect, useState } from 'react'
import { useFetch } from '../utils'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { toast } from 'react-toastify'

function Student () {
  const [code, setCode] = useState('')
  const [codeToCheck, setCodeToCheck] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const urlParams = new URLSearchParams(window.location.search)
  const group = urlParams.get('group')
  const subGroup = urlParams.get('subgroup')

  const { appendData: sendCode, loading: sendLoading, error: sendError } = useFetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}api/tecno-redes?group=${group}&subgroup=${subGroup}`
  )

  const { appendData: checkCode, loading: checkLoading, error: checkError } = useFetch(
    `${import.meta.env.VITE_REACT_APP_API_URL}api/tecno-redes?group=${group}&subgroup=${subGroup}`
  )

  const handleSendCode = (event) => {
    event.preventDefault()

    const onSent = () => {
      setIsCodeSent(true)
      setCode('')
      toast.success('Código enviado correctamente')
    }
    sendCode(JSON.stringify({ code }), 'POST', onSent())
  }

  const handleCheckCode = (event) => {
    event.preventDefault()

    const onChecked = () => {
      setCodeToCheck('')
      toast.success('🎉 ¡¡¡Código correcto!!! 🎉')
    }
    checkCode(JSON.stringify({ code: codeToCheck }), 'POST', onChecked())
  }

  useEffect(() => {
    if (sendError) {
      setIsCodeSent(false)
      toast.error(sendError.message)
    } else if (checkError) toast.error(checkError.message)
  }, [sendError, checkError])

  return (
    <>
      <h1>Grupo {group}</h1>
      <h1>Subgrupo {subGroup}</h1>
      <Form>
        {subGroup === 'A' &&
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
              <p>Color seleccionado: {code}</p>
              <Button variant='primary' type='submit' onClick={handleSendCode} disabled={sendLoading}>
                Validar
              </Button>
            </Form.Group>
          </>
        )}
        {subGroup === 'B' &&
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
              <p>Palabra seleccionada: {code}</p>
              <Button variant='primary' type='submit' onClick={handleSendCode} disabled={sendLoading}>
                Validar
              </Button>
            </Form.Group>
          </>
        )}
        {isCodeSent && subGroup === 'A' &&
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
              <p>Palabra seleccionada: {code}</p>
              <Button variant='primary' type='submit' onClick={handleCheckCode} disabled={checkLoading}>
                Comprobar
              </Button>
            </Form.Group>
          </>
        )}
        {isCodeSent && subGroup === 'B' &&
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
              <p>Color seleccionado: {code}</p>
              <Button variant='primary' type='submit' onClick={handleCheckCode} disabled={checkLoading}>
                Comprobar
              </Button>
            </Form.Group>
          </>
        )}
      </Form>
    </>
  )
}

export default Student
