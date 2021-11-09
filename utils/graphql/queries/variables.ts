/* eslint-disable no-extra-boolean-cast */
export const queryVariables = (variableValues: { [key:string]: any }): { props: string; variables: { [key: string]: any } } => {
  const propTypes: { [key:string]: string } = {
    where: 'JSON',
    limit: 'Int',
    sort: 'String',
    start: 'Int',
    publicationState: 'PublicationState'
  }
  const variableKeys = Object.keys(variableValues).filter(key => !!propTypes[key] && typeof variableValues !== 'undefined')
  return {
    props: variableKeys.map((key) => {
      return `$${key}: ${propTypes[key]}`
    }).join(', '),
    variables: variableKeys.reduce((acc, key) => {
      return { ...acc, [key]: variableValues[key] }
    }, {})
  }
}
