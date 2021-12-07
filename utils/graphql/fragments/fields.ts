export const mediaFields = (fragmentType: 'default' | 'full' | 'tiny' = 'default'): string => {
  const fields = {
    tiny: 'id name url alternativeText mime caption',
    default: 'id name url alternativeText mime formats caption',
    full: 'id name url alternativeText mime formats size height width caption'
  }
  return Object.keys(fields).includes(fragmentType) ? fields[fragmentType] : fields.default
}

export const seoFields = `title
        description
        image {
          url
          formats
        }`
