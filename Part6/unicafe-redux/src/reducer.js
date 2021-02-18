const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const currentValueGood = state.good
      return {
        ...state,
        good:currentValueGood + 1
      }
    case 'OK':
      const currentValueOk = state.ok
      return {
        ...state,
        ok:currentValueOk + 1
      }

    case 'BAD':
      const currentValueBad = state.bad
      return {
        ...state,
        bad: currentValueBad + 1
      }
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer