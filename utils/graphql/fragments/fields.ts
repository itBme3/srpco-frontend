export const mediaFields = (fragmentType: 'default' | 'full' | 'tiny' = 'default'): string => {
  const fields = {
    tiny: 'name url alternativeText mime caption',
    default: 'name url alternativeText mime formats caption',
    full: 'name url alternativeText mime formats size height width caption'
  }
  const resFields = Object.keys(fields).includes(fragmentType) ? fields[fragmentType] : fields.default
  return `data { attributes { ${resFields} } }`
}

export const seoFields = `title
        description
        image {
          data {
            id
            attributes {
              url
              formats
            }
          }
        }`
