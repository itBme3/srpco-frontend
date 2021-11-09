export const mediaFields = (fragmentType: 'default' | 'full' | 'tiny' = 'default'):string => {
  const fields = {
    tiny: 'id name url alternativeText mime',
    default: 'id name url alternativeText mime formats',
    full: 'id name url alternativeText mime formats size height width'
  }
  return Object.keys(fields).includes(fragmentType) ? fields[fragmentType] : fields.default
}
