import React from 'react'
import { Box, Button, Select, VStack } from '@chakra-ui/react'
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
  const [filterOption, setFilterOption] = React.useState('all')

  const handleFilterPlayers = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterOption(e.target.value)
  }

  const filteredPlayers = React.useMemo(() => {
    if (!players) return []
    return players.filter(player => {
      return player.position === filterOption || filterOption === 'all'
    })
  }, [filterOption, players])

  return (
    <VStack spacing={10}>
      <Select onChange={handleFilterPlayers} value={filterOption}>
        <option value="all">All</option>
        <option value="GK">Goalkeepers</option>
        <option value="DF">Defenders</option>
        <option value="MF">Midfielders</option>
        <option value="FW">Forwards</option>
      </Select>
      {isLoading && <h2>...loading players</h2>}
      {isError && <h2>Something went wrong</h2>}
      {players &&
          filteredPlayers.map(player => <PlayerCard key={player.id} player={player} />)}
    </VStack>
  )
}
