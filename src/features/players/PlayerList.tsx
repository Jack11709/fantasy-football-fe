import React from 'react'
import { Box, Button, Select, VStack , Input } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Player, useGetPlayersQuery } from '../../services/players'
import { addPlayerToTeam, selectTeam, removePlayerFromTeam } from '../team/teamSlice'

function PlayerCard({ player }: { player: Player}) {
  const dispatch = useAppDispatch()
  const { goalkeeper, defenders, midfielders, forwards } = useAppSelector(selectTeam)
  const isPicked = [goalkeeper, ...defenders, ...midfielders, ...forwards].some(member => {
    if (member) return member.id === player.id
    return false
  })

  return (
    <Box key={player.id}>
      <h3>
        {player.name} - {player.position}
      </h3>
      {!isPicked ? (
        <Button onClick={() => dispatch(addPlayerToTeam(player))}>
          Add to Team
        </Button>
      ) : (
        <Button onClick={() => dispatch(removePlayerFromTeam(player))}>
          Remove from Team
        </Button>
      )}
    </Box>
  )
}

export default function PlayerList() {
  const { data: players, isLoading, isError } = useGetPlayersQuery()
  const [filterPosition, setFilterOption] = React.useState('all')
  const [filterName, setFilterName] = React.useState('')

  const handleFilterPlayers = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(e.target.value)
  }

  const handlefilterName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(e.target.value)
  }

  const filteredPlayers = React.useMemo(() => {
    if (!players) return []
    const re = new RegExp(filterName)
    return players.filter(player => {
      return (player.position === filterPosition || filterPosition === 'all') && re.test(player.name)
    })
  }, [filterPosition,filterName, players])

  return (
    <VStack spacing={10}>
      <Select onChange={handleFilterPlayers} value={filterPosition}>
        <option value="all">All</option>
        <option value="GK">Goalkeepers</option>
        <option value="DF">Defenders</option>
        <option value="MF">Midfielders</option>
        <option value="FW">Forwards</option>
      </Select>
      <Input placeholder="Search by player name" value={filterName} onChange={handlefilterName}/>
      {isLoading && <h2>...loading players</h2>}
      {isError && <h2>Something went wrong</h2>}
      {players &&
          filteredPlayers.map(player => <PlayerCard key={player.id} player={player} />)}
    </VStack>
  )
}
