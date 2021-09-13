import { useAppSelector, useAppDispatch } from './app/hooks'
import { selectFormation, changeFormation, Formation } from './features/formation/formationSlice'

export default function App() {
  const currentFormation = useAppSelector(selectFormation)
  const dispatch = useAppDispatch()

  return (
    <div>
      <h2>Current Formation: {currentFormation}</h2>
      <p>Switch:</p>
      {Object.values(Formation).map(formation => (
        <div key={formation}>
          <button onClick={() => dispatch(changeFormation(formation))}>{formation}</button>
        </div>
      ))}
    </div>
  )
}
