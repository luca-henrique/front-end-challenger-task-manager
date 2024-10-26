import { render } from "@testing-library/react"
import { CardTask } from "./task"

test('it render', () => {
  render(<CardTask id={0} title={""} content={""} date={new Date()} deleteTask={() => { }} selectTask={() => { }} />)
})