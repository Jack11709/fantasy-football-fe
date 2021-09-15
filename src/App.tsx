import { Box, Flex, VStack } from '@chakra-ui/react'

import Team from './features/team/Team'
import FormationSelect from './features/team/FormationSelect'
import PlayerList from './features/players/PlayerList'


export default function App() {
  return (
    <Flex>
      <Box p={5} w={350} borderWidth="1px">
        <PlayerList />
      </Box>
      <Flex justify={'center'} width={'100%'} p={20}>
        <VStack spacing={10}>
          <Team />
          <FormationSelect />
        </VStack>
      </Flex>
    </Flex>
  )
}
