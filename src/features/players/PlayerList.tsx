import React from 'react'
import { Select, VStack , Input, Skeleton } from '@chakra-ui/react'
import { useAppSelector } from '../../app/hooks'
import { useGetPlayersQuery } from '../../services/players'
import { selectTeam } from '../team/teamSlice'
import { FixedSizeList as List } from 'react-window'
import PlayerCard from './PlayerCard'
import { PickedPlayer } from '../../types'

function Loading() {
  return (
    <>
      {Array(10).fill('').map((_, i) => (
        <Skeleton key={i} borderWidth="1px" borderRadius="lg" w={300} h={135} />
      ))}
    </>
  )
}

function Row({ index, style, data }: { index: number, style: React.CSSProperties, data: PickedPlayer[]}) {
  const player = data[index]
  return (
    <div style={style}>
      <PlayerCard player={player}/>
    </div>
  )
}

export default function PlayerList() {
  const { data: players, isLoading, isError } = useGetPlayersQuery()
  const { goalkeeper, defenders, midfielders, forwards } = useAppSelector(selectTeam)
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
      return (
        (player.position === filterPosition || filterPosition === 'all') &&
        re.test(player.name)
      )
    }).map(player => ({
      ...player,
      isPicked: [goalkeeper, ...defenders, ...midfielders, ...forwards].some(
        member => {
          if (member) return member.id === player.id
          return false
        }
      ),
    }))
  }, [players, filterName, filterPosition, goalkeeper, defenders, midfielders, forwards])

  return (
    <VStack spacing={5}>
      <Select onChange={handleFilterPlayers} value={filterPosition}>
        <option value="all">All</option>
        <option value="GK">Goalkeepers</option>
        <option value="DF">Defenders</option>
        <option value="MF">Midfielders</option>
        <option value="FW">Forwards</option>
      </Select>
      <Input
        placeholder="Search by player name"
        value={filterName}
        onChange={handlefilterName}
      />
      {isLoading && <Loading />}
      {isError && <h2>Something went wrong</h2>}
      {players &&
      <List
        height={1200}
        itemCount={filteredPlayers.length}
        itemSize={180}
        width={300}
        style={{ 'scrollbarWidth': 'none' }}
        itemData={filteredPlayers}
      >
        {Row}
      </List>}
    </VStack>
  )
}
