export const getTitleColorFromDifficulty = (difficulty) => {
  if ( difficulty === 'Easy' ) {
      return '#28a745'
  } else if ( difficulty === 'Medium' ) {
    return 'orange'
  } else {
    return 'red'
  }
}
