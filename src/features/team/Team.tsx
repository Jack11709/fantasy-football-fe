import { HStack, VStack, Avatar } from '@chakra-ui/react'
import { useAppSelector } from '../../app/hooks'
import { Player } from '../../types'
import { selectTeam } from './teamSlice'

function Line({ players }: { players: (Player | null)[]}) {
  return (
    <HStack spacing={8}>
      {players
        .map((player, i) => {
          if (!player) return <Avatar key={i} />

          return <Avatar key={i} src={player.thumbnail} />
        })}
    </HStack>
  )
}

export default function Team() {
  const currentTeam = useAppSelector(selectTeam)
  return (
    <VStack
      bg={'green'}
      spacing={20}
      p={10}
      w={400}
      boxShadow={'0 3px 10px rgb(0 0 0 / 0.2)'}
    >
      <Line players={currentTeam.forwards} />
      <Line players={currentTeam.midfielders} />
      <Line players={currentTeam.defenders} />
      <div>
        {currentTeam.goalkeeper ? (
          <Avatar
            name={currentTeam.goalkeeper.name}
            src={currentTeam.goalkeeper.image}
          />
        ) : (
          <Avatar />
        )}
      </div>
    </VStack>
  )
}
