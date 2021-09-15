import { Button, Select, Box } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Formation } from '../../types'
import {
  selectFormation,
  changeFormation
} from './teamSlice'

export default function FormationSelect() {
  const currentFormation = useAppSelector(selectFormation)
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as Formation
    dispatch(changeFormation(value))
  }

  const handleClearTeam = () => {
    dispatch(changeFormation(currentFormation))
  }

  return (
    <Box>
      <Select onChange={handleChange} value={currentFormation}>
        {Object.values(Formation).map(formation => (
          <option key={formation} value={formation}>
            {formation}
          </option>
        ))}
      </Select>
      <Button onClick={handleClearTeam}>Clear Team</Button>
    </Box>
  )
}
