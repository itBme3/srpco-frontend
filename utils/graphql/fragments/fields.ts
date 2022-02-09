
export const mediaFields: { default: string, full: string, tiny: string } = {
  tiny: `data { attributes { name url alternativeText mime caption }}`,
  default: `data { attributes { name url alternativeText mime formats caption }}`,
  full: `data { attributes { name url alternativeText mime formats size height width caption }}`,
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
    }
  `
