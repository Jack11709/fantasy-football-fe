export enum Formation {
    FiveFourOne = '5-4-1',
    FiveThreeTwo = '5-3-2',
    FourFiveOne = '4-5-1',
    FourFourTwo = '4-4-2',
    FourThreeThree = '4-3-3',
    ThreeFiveTwo = '3-5-2',
    ThreeFourThree = '3-4-3',
}

export interface TeamState {
    formation: Formation
    goalkeeper: null | Player
    defenders: (Player | null)[],
    midfielders: (Player | null)[],
    forwards: (Player | null)[],
}


export interface Player {
  id: number,
  name: string
  position: string
  totalPoints: 0
  image: string
  thumbnail: string
  club: string
}


export interface PickedPlayer extends Player {
  isPicked: boolean
}
