import { Box, Flex, Stack } from '@chakra-ui/react'

import Pitch from './features/team/Team'
import FormationSelect from './features/team/FormationSelect'
import PlayerList from './features/players/PlayerList'


export default function App() {
  return (
    <Flex minH={'100vh'}>
      <Box
        p={5}
        w={300}
        borderX={'1px solid black'}
      >
        <PlayerList />
      </Box>
      <Stack spacing={10} p={20}>
        <Pitch />
        <FormationSelect />
      </Stack>
    </Flex>
  )
}
