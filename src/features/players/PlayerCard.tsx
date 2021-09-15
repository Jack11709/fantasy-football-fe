import { useAppDispatch } from '../../app/hooks'
import { addPlayerToTeam, removePlayerFromTeam } from '../team/teamSlice'
import { Box, Button, Avatar, Heading, Flex } from '@chakra-ui/react'
import { PickedPlayer } from '../../types'

export default function PlayerCard({ player }: { player: PickedPlayer }) {
  const dispatch = useAppDispatch()
  return (
    <Box key={player.id} borderWidth="1px" borderRadius="lg" w={'100%'}>
      <Flex
        bg={'lightgray'}
        p={3}
        flexDir={'column'}
        alignItems={'center'}
        justifyContent={'space-between'}
        borderTopRadius="lg"
      >
        <Heading size={'xs'} mb={2}>
          {player.name}
        </Heading>
        <Avatar src={player.thumbnail} />
      </Flex>
      <Button
        colorScheme={!player.isPicked ? 'blue' : 'red'}
        onClick={() =>
          !player.isPicked
            ? dispatch(addPlayerToTeam(player))
            : dispatch(removePlayerFromTeam(player))
        }
        w={'100%'}
        borderTopRadius={0}
      >
        {!player.isPicked ? 'Add to Team' : 'Remove from Team'}
      </Button>
    </Box>
  )
}
