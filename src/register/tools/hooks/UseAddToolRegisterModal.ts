import { useDebounce } from 'use-debounce';
import { FormEvent, useEffect, useState } from "react"
import { toDate, toDateInputString } from "../../../utils/DateUtils"
import { getVolunteers } from "../../../volunteers/volunteerService"
import { fecthToolsLoose } from "../../../resources/tools/toolService"
import { Volunteer } from "../../../volunteers/tVolunteers"
import { ToolRegister } from "../tToolRegisters"
import { createToolRegister } from "../ToolRegisterService"
import { Tool } from "../../../resources/tools/tTools"

export function useAddToolRegisterModal({ refreshRegister }: { refreshRegister: Function }) {
  const [possibleVolunteers, setPossibleVolunteers] = useState<Volunteer[]>([])
  const [currentVolunteer, setCurrentVolunteer] = useState<string>('')
  const [debouncedVolunteer] = useDebounce(currentVolunteer, 500)
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null)
  const [date, setDate] = useState(toDateInputString(new Date()))
  const [selectedTools, setSelectedTools] = useState<Tool[]>([])
  const [currentTool, setCurrentTool] = useState<string>('')
  const [debouncedTool] = useDebounce(currentTool, 500)
  const [possibleTools, setPossibleTools] = useState<Tool[]>([])
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (currentVolunteer === '')
      return setPossibleVolunteers([])

    async function fetchVolunteers(query: string) {
      //const newVolunteers = await getVolunteers({ query, size: 10 })
      //setPossibleVolunteers(newVolunteers)
    }
    fetchVolunteers(currentVolunteer)

  }, [debouncedVolunteer])


  useEffect(() => {
    if (currentTool === '')
      return setPossibleTools([])

    async function fetchTools(query: string) {
      const newTools = await fecthToolsLoose({ filterString: query, status: 'AVAILABLE', size: 10 })
      const selectedIds = selectedTools.map(t => t.id)
      newTools.filter(t => !selectedIds.includes(t.id))
      setPossibleTools(newTools.filter(t => !selectedIds.includes(t.id)))
    }
    fetchTools(currentTool)

  }, [debouncedTool])

  const handleChangeCurrentVolunteer = (volunteer: string) => {
    setSelectedVolunteer(null)
    setCurrentVolunteer(volunteer)
  }
  const handleChangeSelectedVolunteer = (volunteer: Volunteer, volunteerText: string) => {
    setSelectedVolunteer(volunteer)
    setCurrentVolunteer(volunteerText)
  }

  const handleAddRegisters = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    if (selectedVolunteer === null)
      return

    const registersToCreate: ToolRegister[] = selectedTools.map(tool => {
      return {
        registerFrom: toDate(date),
        toolName: tool.name,
        toolBarcode: tool.barcode,
        toolUrlImages: tool.urlImages,
        volunteerName: selectedVolunteer.name,
        volunteerLastName: selectedVolunteer.lastName,
        volunteerBuilderAssistantId: selectedVolunteer.builderAssistantId
      }
    }
    )

    createToolRegister(registersToCreate)
      .then(registersCreated => {
        setSuccessMessage(`¡Registros creados correctamente! Número de registros añadidos: ${registersCreated.length}`)
      })
      .catch( /*manejar el error */)
      .finally(() => {
        handleChangeCurrentVolunteer('')
        setSelectedTools([])
        setCurrentTool('')
        setTimeout(() => setSuccessMessage(''), 3000)
        refreshRegister()
        setLoading(false)
      })
  }

  const removeTool = (toolId: number) => {
    const newTools = selectedTools.filter(tool => toolId !== tool.id)
    setSelectedTools(newTools)
  }

  const handleSelectTool = (tool: Tool) => {
    setCurrentTool('')
    setSelectedTools([...selectedTools, tool])
  }

  const handleChangeCurrentTool = (tool: string) => {
    setCurrentTool(tool)
  }

  const handleSetDate = (date: string) => {
    setDate(date)
  }

  return {
    selectedVolunteer,
    date,
    selectedTools,
    loading,
    handleAddRegisters,
    handleChangeCurrentVolunteer,
    currentVolunteer,
    possibleVolunteers,
    handleChangeSelectedVolunteer,
    removeTool,
    handleChangeCurrentTool,
    currentTool,
    possibleTools,
    handleSelectTool,
    handleSetDate,
    successMessage
  }
}